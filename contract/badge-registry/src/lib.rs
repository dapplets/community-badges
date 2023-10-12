use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};

type BadgeType = String;
type BadgeId = String;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BadgeRegistry {
    owner: AccountId,
    badge_types: UnorderedMap<BadgeId, BadgeType>,
    user_badges: UnorderedMap<AccountId, Vec<BadgeId>>,
}

impl Default for BadgeRegistry {
    fn default() -> Self {
        Self {
            owner: "mybadge.near".parse().unwrap(),
            badge_types: UnorderedMap::new(b"badge_types".to_vec()),
            user_badges: UnorderedMap::new(b"user_badges".to_vec()),
        }
    }
}

#[near_bindgen]
impl BadgeRegistry {
    #[init]
    #[private]
    pub fn init() -> Self {
        Self {
            owner: env::predecessor_account_id(),
            badge_types: UnorderedMap::new(b"badge_types".to_vec()),
            user_badges: UnorderedMap::new(b"user_badges".to_vec()),
        }
    }

    pub fn get_badges_by_account(
        &self,
        account_id: AccountId,
    ) -> Vec<(BadgeId, BadgeType)> {
        if let Some(badges) = self.user_badges.get(&account_id) {
            let badges_info: Vec<(BadgeId, BadgeType)> = badges
                .iter()
                .filter_map(|badge_id| {
                    if let Some(badge_type) = self.badge_types.get(&badge_id) {
                        Some((badge_id.clone(), badge_type.clone()))
                    } else {
                        None
                    }
                })
                .collect();
            badges_info
        } else {
            vec![]
        }
    }

    pub fn get_all_badges(&self) -> Vec<(BadgeId, BadgeType)> {
        let mut all_badges = vec![];
        for (badge_id, badge_type) in self.badge_types.iter() {
            all_badges.push((badge_id, badge_type));
        }
        all_badges
    }

    pub fn add_badge(&mut self, badge_id: BadgeId, badge_type: BadgeType) {
        self.only_owner();
        self.badge_types.insert(&badge_id, &badge_type);
    }

    pub fn add_badge_to_account(&mut self, badge_id: BadgeId, account_id: AccountId) {
        self.only_owner();
        if let Some(_) = self.badge_types.get(&badge_id) {
            let mut user_badges = self.user_badges.get(&account_id).unwrap_or_else(|| vec![]);
            user_badges.push(badge_id.clone());
            self.user_badges.insert(&account_id, &user_badges);
        } else {
            env::panic_str("Badges: no badge found");
        }
    }

    pub fn remove_badge_from_account(&mut self, badge_id: BadgeId, account_id: AccountId) {
        self.only_owner();
        if let Some(mut user_badges) = self.user_badges.get(&account_id) {
            if let Some(position) = user_badges.iter().position(|id| id == &badge_id) {
                user_badges.remove(position);
                self.user_badges.insert(&account_id, &user_badges);
            }
        }
    }

    pub fn owner(&self) -> AccountId {
        self.owner.clone()
    }

    pub fn transfer_ownership(&mut self, new_owner: AccountId) {
        self.only_owner();
        self.owner = new_owner;
    }

    fn only_owner(&self) {
        assert_eq!(
            &env::predecessor_account_id(),
            &self.owner,
            "Only the owner can call this method."
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;

    const ACCOUNT_ID_1: &str = "account1.testnet";

    #[test]
    fn test_add_badge() {
        let mut contract = BadgeRegistry::init();
        contract.add_badge("badge1".to_string(), "type1".to_string());
        let badges = contract.get_all_badges();
        assert_eq!(badges.len(), 1);
    }

    #[test]
    fn test_add_badge_to_account() {
        let mut contract = BadgeRegistry::init();
        contract.add_badge("badge1".to_string(), "type1".to_string());
        contract.add_badge_to_account("badge1".to_string(), ACCOUNT_ID_1.parse().unwrap());
        let badges = contract.get_badges_by_account(ACCOUNT_ID_1.parse().unwrap());
        assert_eq!(badges.len(), 1);
    }

    #[test]
    fn test_remove_badge_from_account() {
        let mut contract = BadgeRegistry::init();
        contract.add_badge("badge1".to_string(), "type1".to_string());
        contract.add_badge_to_account("badge1".to_string(), ACCOUNT_ID_1.parse().unwrap());
        contract.remove_badge_from_account("badge1".to_string(), ACCOUNT_ID_1.parse().unwrap());
        let badges = contract.get_badges_by_account(ACCOUNT_ID_1.parse().unwrap());
        assert_eq!(badges.len(), 0);
    }

    #[test]
    fn test_transfer_ownership() {
        let mut contract = BadgeRegistry::init();
        let new_owner = AccountId::new_unchecked("new_owner.near".to_string());
        contract.transfer_ownership(new_owner.clone());

        let owner = contract.owner();
        assert_eq!(owner, new_owner.clone());
    }

    #[test]
    #[should_panic(expected = "Only the owner can call this method.")]
    fn test_non_owner_transfer_ownership() {
        let mut contract = BadgeRegistry::init();
        let new_owner = AccountId::new_unchecked("new_owner.near".to_string());
        set_context("third.near");
        contract.transfer_ownership(new_owner.clone());
    }

    fn set_context(predecessor: &str) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());
        testing_env!(builder.build());
    }
}
