/**
 * Required External Modules and Interfaces
 */
import Checkout, { OrderItem } from "./checkout.interface";
import { getItem } from "../items/items.service";
import { Rule, RuleType } from "../PricingRules/rule.interface";

/**
 * Checkot Module
 */
class CheckoutModule implements Checkout {
  pricingRules: [Rule];
  private totalValue: number = 0;
  private orderItems: [] = [];
  constructor(pricingRules: [Rule]) {
    this.pricingRules = pricingRules;
  }

  private calculateRuleValues = (
    rule: Rule,
    quantity: number,
    price?: number // the original price
  ) => {
    let total = 0;
    switch (rule.type) {
      case RuleType.DISCOUNT:
        // @ts-ignore
        total += rule.condition.price * quantity;
        break;
      case RuleType.FREE:
        // It is required to check whether the minimum required
        // amount of item quantities are in the order. Otherwise
        // do the generic calculation
        // @ts-ignore
        const minItems = rule.condition.buy + rule.condition.free;
        if (quantity >= minItems) {
          // calculate the discounted price
          total += // @ts-ignore
            Math.ceil((quantity / minItems) * rule.condition.buy) * price;
        } else {
          // generic calculation
          total += price ? price * quantity : 0;
        }
        break;
    }
    return total;
  };

  async add(item: OrderItem): Promise<void> {
    // check whether the item exists and add the value to the total
    if (item && item.itemId !== "") {
      // @ts-ignore
      this.orderItems.push(item);
    } else {
      // TODO pass the error to the frontend
      console.log("invalid data");
    }
  }

  private calculateTotal = async () => {
    if (this.orderItems.length) {
      this.orderItems.map(async (item: OrderItem) => {
        const itemObj = await getItem(item.itemId);
        if (itemObj && itemObj.id) {
          // check whether a specific rule is passed
          if (this.pricingRules && this.pricingRules.length) {
            this.pricingRules.map((rule) => {
              if (itemObj.id === rule.item) {
                this.totalValue += this.calculateRuleValues(
                  rule,
                  item.quantity,
                  itemObj.retailPrice
                );
              } else {
                this.totalValue += itemObj.retailPrice * item.quantity;
              }
            });
          } else {
            // add the generic pricing
            this.totalValue += itemObj.retailPrice * item.quantity;
          }
        } else {
          // TODO pass the error to the frontend
          console.log("item doesn't exist");
        }
      });
    }
  };

  async total(): Promise<number> {
    await this.calculateTotal();
    return parseFloat(this.totalValue / 100 + "");
  }
}

export default CheckoutModule;
