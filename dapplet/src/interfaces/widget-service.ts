export type BadgeWidgetCfg = {
    src: string;
    insertionPoint: string;

    [prop: string]: any;
}

export interface WidgetService {
    getWidgetsByAccount(accountId: string, originId: string, contextType: string): Promise<BadgeWidgetCfg[]>
}