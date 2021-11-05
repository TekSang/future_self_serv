import _ from "lodash";
export const getSortedOrders = (orders) => {
  console.log(orders);
  return _.groupBy(orders, function (order) {
    return order.order.status;
  });
};
