import _ from "lodash";
export const getSortedOrders = (orders) => {
  console.log(orders);
  return _.groupBy(
    orders.filter((o) => o.order.status === "INLINE"),
    function (order) {
      return order.order.status;
    }
  );
};
