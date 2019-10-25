export interface TokenData {
  type: AccountType;
  username: string;
  email: string;
}

export const enum AccountType {
  Diner = 1,
  Restaurant = 2
}
