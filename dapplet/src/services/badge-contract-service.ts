import { Badge, BadgeService } from "../interfaces/badge-service";
import { COMMUNITY_REGISTRY_ADDRESS, NEAR_NETWORK } from "../constants";

type BadgeId = string;
type BadgeType = string;

interface CommunityRegistryContract {
  get_communities(): Promise<string[]>;
}

interface BadgesRegistryContract {
  get_badges_by_account(args: {
    account_id: string;
  }): Promise<[BadgeId, BadgeType]>;
}

export class BadgeContractService implements BadgeService {
  private _badgeRegistries: Promise<
    BadgesRegistryContract[]
  > = this._instantiateBadgeContracts();

  private _cache = new Map<string, Promise<Badge[]>>();

  async getBadgesByAccount(accountId: string): Promise<Badge[]> {
    if (!this._cache.has(accountId)) {
      this._cache.set(accountId, this._getBadgesByAccountFromContract(accountId))
    }

    return this._cache.get(accountId)
  }

  private async _getBadgesByAccountFromContract(accountId: string): Promise<Badge[]> {
    console.log(accountId)
    
    const registries = await this._badgeRegistries;

    const badges = await Promise.all(
      registries.map((registry) =>
        registry.get_badges_by_account({ account_id: accountId })
      )
    );

    return badges
      .flat()
      .map(([bosWidgetSrc, type]) => ({ bosWidgetSrc, type } as any));
  }

  private async _instantiateBadgeContracts(): Promise<
    BadgesRegistryContract[]
  > {
    const communityRegistry: CommunityRegistryContract = await Core.contract(
      "near",
      COMMUNITY_REGISTRY_ADDRESS,
      {
        viewMethods: ["get_communities"],
        changeMethods: [],
        network: NEAR_NETWORK,
      }
    );

    const communities = await communityRegistry.get_communities();

    return Promise.all(
      communities.map((communityAddress) =>
        Core.contract("near", communityAddress, {
          viewMethods: ["get_badges_by_account"],
          changeMethods: [],
          network: NEAR_NETWORK,
        })
      )
    );
  }
}
