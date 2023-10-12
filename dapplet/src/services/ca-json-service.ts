import { Account, CaService } from '../interfaces/ca-service'
import users from '../../data/near-social-users.json'

export class CaJsonService implements CaService {
    private _userByTwitter = new Map(users.map((user) => [user.twitter, user]))
    private _userByGitHub = new Map(users.map((user) => [user.github, user]))

    private _userByOrigin = {
        twitter: this._userByTwitter,
        github: this._userByGitHub,
    }

    async getLinkedAccounts(account: Account): Promise<Account[]> {
        if (account.originId !== 'twitter' && account.originId !== 'github') {
            return []
        }

        const accountDetails = this._userByOrigin[account.originId].get(account.accountId)

        if (!accountDetails) {
            return []
        }

        const linkedAccounts: Account[] = []

        if (accountDetails.github) {
            linkedAccounts.push({
                accountId: accountDetails.github,
                originId: 'github',
            })
        }

        if (accountDetails.twitter) {
            linkedAccounts.push({
                accountId: accountDetails.twitter,
                originId: 'twitter',
            })
        }

        if (accountDetails.near) {
            linkedAccounts.push({
                accountId: accountDetails.near,
                originId: 'near',
            })
        }

        return linkedAccounts
    }
}
