export type Badge = {
  bosWidgetSrc: string;
  type: "avatar" | "community" | "shorten" | "full";
};

export interface BadgeService {
  getBadgesByAccount(accountId: string): Promise<Badge[]>;
}
