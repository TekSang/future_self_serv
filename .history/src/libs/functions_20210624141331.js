import _ from "lodash";
export const getSortedOrders = (orders) => {
  console.log(orders.filter((o) => o.products.length > 2));
  return _.groupBy(
    orders.filter((o) => o.products.length > 2),
    function (order) {
      return order.order.status;
    }
  );
};
