import _ from "lodash";
export const getSortedOrders = (orders) => {
  console.log(orders.filter((o) => o.products.length > 3));
  return _.groupBy(orders, function (order) {
    return order.order.status;
  });
};
