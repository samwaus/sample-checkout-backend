/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import Checkout, { OrderItem } from "../Checkout/checkout.interface";
import CheckoutModule from "../Checkout/Checkout";
import { Rule } from "../PricingRules/rule.interface";

/**
 * Router Definition
 */
export const checkoutRouter = express.Router();

/**
 * Controller Definitions
 */

// POST checkout
checkoutRouter.post("/", async (req: Request, res: Response) => {
  try {
    const rules: [Rule] = req.body.rules;
    const order: [OrderItem] = req.body.orderItems;

    if (order && order.length) {
      // instantiate the module
      let co = new CheckoutModule(rules);

      // add items
      order.map(async (item: OrderItem) => {
        await co.add(item);
      });
      const total = await co.total();
      res.status(200).json(total);
    } else {
      res.status(500).send("No order items passed");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
