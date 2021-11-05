import faker from "faker";
import _ from "lodash";
import { ORDER_STATUS } from "../libs/constants";
const status = [ORDER_STATUS.CHOOSING, ORDER_STATUS.INLINE, ORDER_STATUS.IN_PROGRESS];
// creates a list of fake orders
function getOrders(num) {
  const orders = [];
  for (let i = 0; i < num; i++) {
    orders.push({
      products: Array.from(Array(Math.round(1 + 10 * Math.random())).keys()).map((item) => ({
        id: faker.random.alphaNumeric(15),
        name: faker.commerce.productName(),
        quantity: Math.round(Math.random() * 10),
      })),
      table: "Table " + faker.name.lastName(),
      id: faker.random.alphaNumeric(15),
      status: _.sample(status),
    });
  }

  return orders;
}

export const mock_orders = getOrders(Math.round(Math.random() * 100));
