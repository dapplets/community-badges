import { Account, CaService } from "../interfaces/ca-service";
import users from "../../data/near-social-users.json";

export class CaJsonService implements CaService {
  private _userByTwitter = new Map(users.map((user) => [user.twitter, user]));

  async getLinkedAccounts(account: Account): Promise<Account[]> {
    if (account.originId !== "twitter") {
      return [];
    }

    const accountDetails = this._userByTwitter.get(account.accountId);

    if (!accountDetails) {
      return [];
    }

    const linkedAccounts: Account[] = [];

    if (accountDetails.github) {
      linkedAccounts.push({
        accountId: accountDetails.github,
        originId: "github",
      });
    }

    if (accountDetails.twitter) {
      linkedAccounts.push({
        accountId: accountDetails.twitter,
        originId: "twitter",
      });
    }

    if (accountDetails.near) {
      linkedAccounts.push({
        accountId: accountDetails.near,
        originId: "near",
      });
    }

    return linkedAccounts;
  }
}
