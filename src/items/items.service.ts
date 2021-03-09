/**
 * Data Model Interfaces
 */

/**
 * Required External Modules and Interfaces
 */
import { Item } from "./item.interface";
import { Items } from "./items.interface";
// TODO load item data from the database
const data = require("../../data/items.json");

/**
 * Service Methods
 */

export const getAll = async (): Promise<Items> => data;
export const getItem = (id: string) => {
  return new Promise<Item>((resolve, reject) => {
    const item = data.filter((item: Item) => item.id === id);
    resolve(item && item[0] ? item[0] : null);
  });
};
