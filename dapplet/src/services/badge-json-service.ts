import { Badge, BadgeService } from "../interfaces/badge-service";
import near from "../../data/badges-near.json";
import devhacks from "../../data/badges-devhacks.json";
import lnc from "../../data/badges-lnc.json";
import dapplets from "../../data/badges-dapplets.json";
import neardevgov from '../../data/badges-neardevgov.json';

const allData = [near, devhacks, lnc, dapplets, neardevgov];

export class BadgeJsonService implements BadgeService {
  async getBadgesByAccount(accountId: string): Promise<Badge[]> {
    return allData
      .map((community) =>
        (community.badgesByAccount[accountId] ?? []).map((bosWidgetSrc) => ({
          bosWidgetSrc,
          type: community.badges[bosWidgetSrc].type,
        }))
      )
      .flat();
  }
}
