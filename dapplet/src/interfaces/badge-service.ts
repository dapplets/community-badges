export type Badge = {
  bosWidgetSrc: string;
  type: "avatar" | "community" | "shorten" | "full";
  props?: any;
};

export interface BadgeService {
  getBadgesByAccount(accountId: string): Promise<Badge[]>;
}
