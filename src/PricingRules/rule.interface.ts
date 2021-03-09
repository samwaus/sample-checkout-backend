type RuleFreeOne = {
  free: number;
  buy: number;
};

type RuleDiscount = {
  price: number;
};

export enum RuleType {
  FREE = "free",
  DISCOUNT = "discount",
}

export interface Rule {
  item: string;
  type: RuleType;
  condition: RuleDiscount | RuleFreeOne;
}
