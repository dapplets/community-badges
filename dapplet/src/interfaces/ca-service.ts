export type Account = {
  originId: string;
  accountId: string;
};

export interface CaService {
  getLinkedAccounts(account: Account): Promise<Account[]>;
}
