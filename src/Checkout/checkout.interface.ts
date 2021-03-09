/**
 * Required External Modules and Interfaces
 */
import { Rule } from "../PricingRules/rule.interface";

/**
 * Checkout interface
 */
export default interface Checkout {
  pricingRules: [Rule] | null;
  add: (item: OrderItem) => Promise<void>;
  total: () => Promise<number>;
}

export type OrderItem = {
  itemId: string;
  quantity: number;
};
