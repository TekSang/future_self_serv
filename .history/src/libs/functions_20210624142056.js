import _ from "lodash";
export const getSortedOrders = (orders) => {
  return _.groupBy(orders, function (order) {
    return order.order.status;
  });
};
