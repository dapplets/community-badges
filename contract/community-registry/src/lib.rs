use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::{env, near_bindgen, AccountId};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CommunityRegistry {
    owner: AccountId,
    communities: UnorderedSet<AccountId>,
}

impl Default for CommunityRegistry {
    fn default() -> Self {
        Self {
            owner: "mybadge.near".parse().unwrap(),
            communities: UnorderedSet::new(b"communities".to_vec()),
        }
    }
}

#[near_bindgen]
impl CommunityRegistry {
    #[init]
    #[private]
    pub fn init() -> Self {
        Self {
            owner: env::predecessor_account_id(),
            communities: UnorderedSet::new(b"communities".to_vec()),
        }
    }

    pub fn get_communities(&self) -> Vec<AccountId> {
        self.communities.iter().collect()
    }

    pub fn add_community(&mut self, account_id: AccountId) {
        self.only_owner();
        self.communities.insert(&account_id);
    }

    pub fn remove_community(&mut self, account_id: AccountId) {
        self.only_owner();
        self.communities.remove(&account_id);
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

    #[test]
    fn test_add_community() {
        let mut contract = CommunityRegistry::init();
        let community_account = AccountId::new_unchecked("community1.near".to_string());
        contract.add_community(community_account.clone());

        let communities = contract.get_communities();
        assert_eq!(communities, vec![community_account.clone()]);
    }

    #[test]
    fn test_remove_community() {
        let mut contract = CommunityRegistry::init();
        let community_account = AccountId::new_unchecked("community1.near".to_string());
        contract.add_community(community_account.clone());

        let communities = contract.get_communities();
        assert_eq!(communities, vec![community_account.clone()]);

        contract.remove_community(community_account.clone());
        let communities = contract.get_communities();
        assert!(communities.is_empty());
    }

    #[test]
    fn test_transfer_ownership() {
        let mut contract = CommunityRegistry::init();
        let new_owner = AccountId::new_unchecked("new_owner.near".to_string());
        contract.transfer_ownership(new_owner.clone());

        let owner = contract.owner();
        assert_eq!(owner, new_owner.clone());
    }

    #[test]
    #[should_panic(expected = "Only the owner can call this method.")]
    fn test_non_owner_transfer_ownership() {
        let mut contract = CommunityRegistry::init();
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
