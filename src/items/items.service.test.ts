/**
 * Required External Modules and Interfaces
 */
import { getAll, getItem } from "./items.service";

// test invalid item
test("invalid item of the function getItem()", async () => {
  const item = await getItem("invalid_item");
  expect(item).toBeNull;
});

// test valid item
test("valid item of the function getItem()", async () => {
  const item = await getItem("medium_pizza");
  expect(item.id).toBe("medium_pizza");
});

// test getAll
test("function getAll()", async () => {
  const items = await getAll();
  console.log("items", items);
  expect(items).not.toBe(null);
  // TODO add more logic to check for array and type
});
