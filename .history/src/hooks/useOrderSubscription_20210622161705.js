import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
//import _ from "lodash";

const useOrderSubscription = () => {
  const [orders, updateOrders] = useState([]);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        // updateOrders(_.uniqBy([...orders, data.value.data.onUpdateOrder], "order.id"));
        let newOrder = data.value.data.onUpdateOrder;
        console.log(
          "🚀 ~ file: useOrderSubscription.js ~ line 16 ~ subscriptionOnUpdateOrder=API.graphql ~ newOrder",
          newOrder
        );
        console.log(orders.filter((o) => o.id !== newOrder.order.id).push(newOrder));
        // updateOrders(orders.filter((o) => o.id !== newOrder.order.id).push(newOrder));
      },
      error: (error) => console.warn(error),
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnUpdateOrder.unsubscribe();
    };
  }, []);

  console.log(orders);

  return orders;
};

export default useOrderSubscription;
