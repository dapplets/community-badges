import { Cacheable } from "caching-decorator";
import { Badge, BadgeService } from "../interfaces/badge-service";

export class BadgeAggregator implements BadgeService {
  private sources: BadgeService[];

  constructor(...sources: BadgeService[]) {
    this.sources = sources
  }

  @Cacheable()
  public async getBadgesByAccount(accountId: string): Promise<Badge[]> {
    const badges = await Promise.all(this.sources.map(source => source.getBadgesByAccount(accountId)))
    return badges.flat();
  }
}
