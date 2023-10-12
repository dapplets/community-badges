import {} from "@dapplets/dapplet-extension";
import { CaService } from "./interfaces/ca-service";
import { CaJsonService } from "./services/ca-json-service";
// import { BadgeJsonService } from "./services/badge-json-service";
import { BadgeService } from "./interfaces/badge-service";
import { WidgetService } from "./interfaces/widget-service";
import { WidgetImplService } from "./services/widget-service";
import { BadgeContractService } from "./services/badge-contract-service";

@Injectable
export default class {
  @Inject("twitter-bos-config")
  private adapter;

  // In the future the implementation can be replaced with Connected Accounts service
  private caService: CaService = new CaJsonService();

  // It will be replaced with a smart-contract
  private badgeService: BadgeService = new BadgeContractService();
  
  private widgetService: WidgetService = new WidgetImplService(
    this.caService,
    this.badgeService
  );

  async activate(): Promise<void> {
    const { bos } = this.adapter.exports;

    // ToDo: extract website name from the virtual adapter
    const originId = "twitter";

    // Widget configs for BOS-components are provided by WidgetService
    this.adapter.attachConfig({
      PROFILE: ({ authorUsername: accountId }) =>
        this.widgetService
          .getWidgetsByAccount(accountId, originId, "PROFILE")
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),

      POST: ({ authorUsername: accountId }) =>
        this.widgetService
          .getWidgetsByAccount(accountId, originId, "POST")
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),

      PROFILE_POPUP: ({ authorUsername: accountId }) =>
        this.widgetService
          .getWidgetsByAccount(accountId, originId, "PROFILE_POPUP")
          .then((cfgs) => cfgs.map((cfg) => bos({ DEFAULT: cfg }))),
    });
  }
}
