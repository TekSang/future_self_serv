import _ from "lodash";
export const getSortedOrders = (orders) => {
  console.log(orders.filter((o) => o.products.length > 2 && o.order.status === "INLINE"));
  return _.groupBy(
    orders.filter((o) => o.order.status === "INLINE"),
    function (order) {
      return order.order.status;
    }
  );
};
