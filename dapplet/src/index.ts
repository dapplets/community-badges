import {} from "@dapplets/dapplet-extension";
import { CaService } from "./interfaces/ca-service";
import { CaJsonService } from "./services/ca-json-service";
import { BadgeJsonService } from "./services/badge-json-service";
import { BadgeService } from "./interfaces/badge-service";
import { WidgetService } from "./interfaces/widget-service";
import { WidgetImplService } from "./services/widget-service";

@Injectable
export default class {
  @Inject("twitter-bos-config")
  private adapter;

  private caService: CaService = new CaJsonService();
  private badgeService: BadgeService = new BadgeJsonService();
  private widgetService: WidgetService = new WidgetImplService(
    this.caService,
    this.badgeService
  );

  async activate(): Promise<void> {
    const { bos } = this.adapter.exports;
    this.adapter.attachConfig({
      PROFILE: (profile) =>
        this.widgetService
          .getWidgetsByAccount(profile.authorUsername, "twitter", "PROFILE")
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),

      POST: (post) =>
        this.widgetService
          .getWidgetsByAccount(post.authorUsername, "twitter", "POST")
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),

      PROFILE_POPUP: (profile) =>
        this.widgetService
          .getWidgetsByAccount(
            profile.authorUsername,
            "twitter",
            "PROFILE_POPUP"
          )
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),
    });
  }
}
