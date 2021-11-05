import _ from "lodash";
export const getSortedOrders = (orders) => {
  return _.groupBy(_.sample(orders), function (order) {
    return order.order.status;
  });
};
