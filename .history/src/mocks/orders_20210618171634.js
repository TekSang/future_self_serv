import faker from "faker";
const status = ["INLINE", "IN_PROGRESS", "CHOOSING"];
// creates a list of fake orders
function getOrders(num) {
  const orders = [];
  for (let i = 0; i < num; i++) {
    orders.push({
      products: Array.from(Array(Math.round(10 * Math.random())).keys()).map((item) => ({
        id: faker.random.alphaNumeric(),
        name: faker.commerce.productName(),
        quantity: Math.round(Math.random() * 10),
      })),
      table: "Table " + Math.round(Math.random() * 50),
    });
  }

  return orders;
}

export const orders = getOrders(Math.round(Math.random() * 50));
