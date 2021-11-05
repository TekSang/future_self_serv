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
      table: "Table " + faker.name.lastName(),
      id: faker.random.alphaNumeric(),
      status: status[Math.round(Math.random() * (status.length - 1))],
    });
  }

  return orders;
}

export const mock_orders = getOrders(Math.round(Math.random() * 100));
