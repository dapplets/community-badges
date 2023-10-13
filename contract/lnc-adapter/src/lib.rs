use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{ext_contract, log, PromiseError};
use near_sdk::json_types::U128;
use near_sdk::{env, near_bindgen, AccountId, Promise, Gas};

pub const TGAS: u64 = 1_000_000_000_000;

type BadgeType = String;
type BadgeId = String;

// Validator interface, for cross-contract calls
#[ext_contract(nft_contract)]
trait NftContract {
    fn nft_supply_for_owner(&self, account_id: AccountId) -> U128;
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct LncAdapter {}

impl Default for LncAdapter {
    fn default() -> Self {
        Self {}
    }
}

#[near_bindgen]
impl LncAdapter {
    pub fn get_badges_by_account(&self, account_id: AccountId) -> Promise {
        let promise = nft_contract::ext("learnernft.learnclub.near".parse().unwrap())
            .with_static_gas(Gas(5 * TGAS))
            .nft_supply_for_owner(account_id);

        return promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(5 * TGAS))
                .nft_supply_for_owner_callback(),
        );
    }

    #[private]
    pub fn nft_supply_for_owner_callback(
        &self,
        #[callback_result] call_result: Result<U128, PromiseError>,
    ) -> Vec<(BadgeId, BadgeType)> {
        if call_result.is_err() {
            log!("There was an error contacting NFT contract");
            return vec![]
        }

        let total: U128 = call_result.unwrap();

        if total.0 > 0 {
            vec![("mybadge.near/widget/LNC.CircleBadge".to_string(), "community".to_string())]
        } else {
            vec![]
        }
    }
}
