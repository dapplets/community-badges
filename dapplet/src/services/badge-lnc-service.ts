import { LNC_NFT_ADDRESS, NEAR_NETWORK } from "../constants";
import { Badge, BadgeService } from "../interfaces/badge-service";

interface NftContract {
  nft_supply_for_owner(args: { account_id: string }): Promise<string>;
}

const COMMUNITY_BADGE: Badge = {
  bosWidgetSrc: "mybadge.near/widget/LNC.CircleBadge",
  type: "community",
};

const DROP_BALANCE: Badge = {
  bosWidgetSrc: "mybadge.near/widget/LNC.DropBalanceBadge",
  type: "full",
};

export class BadgeLncService implements BadgeService {
  private _nftContract: Promise<NftContract> = Core.contract(
    "near",
    LNC_NFT_ADDRESS,
    {
      viewMethods: ["nft_supply_for_owner"],
      changeMethods: [],
      network: NEAR_NETWORK,
    }
  );

  public async getBadgesByAccount(accountId: string): Promise<Badge[]> {
    const nft = await this._nftContract;
    const supply = await nft.nft_supply_for_owner({ account_id: accountId });
    return supply !== "0"
      ? [COMMUNITY_BADGE, { ...DROP_BALANCE, props: { accountId } }]
      : [];
  }
}
