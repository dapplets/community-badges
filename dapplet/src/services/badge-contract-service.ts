import { Badge, BadgeService } from "../interfaces/badge-service";
import { COMMUNITY_REGISTRY_ADDRESS, NEAR_NETWORK } from "../constants";

interface CommunityRegistryContract {
  get_communities(): Promise<string[]>
}

export class BadgeContractService implements BadgeService {
  private _contract: Promise<CommunityRegistryContract> = Core.contract(
    "near",
    COMMUNITY_REGISTRY_ADDRESS,
    {
      viewMethods: ["get_communities"],
      changeMethods: [],
      network: NEAR_NETWORK,
    }
  );

  async getBadgesByAccount(accountId: string): Promise<Badge[]> {
    const communities = await this._contract.then((x) => x.get_communities());
    console.log({ communities });
    return [];
  }
}
