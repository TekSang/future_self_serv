import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import _ from "lodash";

const useOrderSubscription = () => {
  const [orders, updateOrders] = useState([]);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        updateOrders(_.uniq([...orders, data.value.data.onUpdateOrder], "order.id"));
        console.log(data.value.data.onUpdateOrder);
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

  return orders;
};

export default useOrderSubscription;
