import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";

const useOrderSubscription = () => {
  const [orders, updateOrders] = useState([]);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        updateOrders(data.value.data.onUpdateOrder);
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
