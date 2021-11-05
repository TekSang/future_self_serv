import faker from "faker";
const status = [];
// creates a list of fake orders
function getOrders(num) {
  const orders = [];
  for (let i = 0; i < num; i++) {
    orders.push({
      name: faker.name.findName(),
      table: "Table " + Math.round(Math.random() * 50),
    });
  }

  return orders;
}

export const orders = getOrders(Math.round(Math.random() * 50));
