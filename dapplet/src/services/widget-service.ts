import { BadgeService } from '../interfaces/badge-service'
import { CaService } from '../interfaces/ca-service'
import { BadgeWidgetCfg, WidgetService } from '../interfaces/widget-service'

const BADGE_TYPES = {
    avatar: {
        PROFILE: {
            insertionPoint: 'PROFILE_AVATAR',
            size: 'medium',
        },
        POST: {
            insertionPoint: 'POST_AVATAR',
            size: 'small',
        }
    },
    community: {
        PROFILE: {
            insertionPoint: 'PROFILE_FULLNAME',
        },
        POST: {
            insertionPoint: 'POST_FULLNAME',
        },
    },
    shorten: {
        POST: {
            insertionPoint: 'TEXT_BEFORE',
        },
    },
    full: {
        PROFILE_POPUP: {
            insertionPoint: 'PROFILE_POPUP_TEXT',
        },
    },
}

export class WidgetImplService implements WidgetService {
    constructor(private _caService: CaService, private _badgeService: BadgeService) {}

    async getWidgetsByAccount(
        accountId: string,
        originId: string,
        contextType: string
    ): Promise<BadgeWidgetCfg[]> {
        const linkedAccounts = await this._caService.getLinkedAccounts({
            accountId,
            originId,
        })

        const nearAccount = linkedAccounts.find((acc) => acc.originId === 'near')

        if (!nearAccount) return []

        const badges = await this._badgeService.getBadgesByAccount(nearAccount.accountId)

        const widgetCfgs = badges
            .map((badge) => {
                const widgetCfg = BADGE_TYPES[badge.type]?.[contextType]
                if (!widgetCfg) return null
                return { src: badge.bosWidgetSrc, ...widgetCfg }
            })
            .filter((cfg) => !!cfg)

        return widgetCfgs
    }
}
