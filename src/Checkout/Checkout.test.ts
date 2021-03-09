/**
 * Required External Modules and Interfaces
 */
import { OrderItem } from "../Checkout/checkout.interface";
import { Rule, RuleType } from "../PricingRules/rule.interface";
import CheckoutModule from "./Checkout";

// test total() function with discount rule
test("test function total()", async () => {
  const rules: [Rule] = [
    {
      item: "large_pizza",
      type: RuleType.DISCOUNT,
      condition: {
        price: 29999,
      },
    },
  ];
  const checkout = new CheckoutModule(rules);
  checkout.add({ itemId: "large_pizza", quantity: 1 });
  const total = await checkout.total();
  expect(total).toBe(299.99);
});

// test total() function with buy x get y free rule
test("test function total()", async () => {
  const rules: [Rule] = [
    {
      item: "small_pizza",
      type: RuleType.FREE,
      condition: {
        free: 1,
        buy: 2,
      },
    },
  ];
  const checkout = new CheckoutModule(rules);
  checkout.add({ itemId: "small_pizza", quantity: 3 });
  const total = await checkout.total();
  expect(total).toBe(269.99 * 2);
});

// test total() function without any rule
test("test function total()", async () => {
  const rules = undefined;
  // @ts-ignore
  const checkout = new CheckoutModule(rules);
  checkout.add({ itemId: "small_pizza", quantity: 3 });
  const total = await checkout.total();
  expect(total).toBe(269.99 * 3);
});

// TODO add more variations for the rules
