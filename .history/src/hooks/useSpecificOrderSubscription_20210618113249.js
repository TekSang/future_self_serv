import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSpecificOrder } from "../graphql/subscriptions";

const useSpecificOrderSubscription = () => {
  const [order, updateOrder] = useState([]);

  let subscriptionOnUpdateSpecificOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateSpecificOrder = API.graphql(graphqlOperation(onUpdateSpecificOrder)).subscribe({
      next: (data) => {
        updateOrder(data.value.data.onUpdateSpecificOrder);
        console.log(data.value.data.onUpdateSpecificOrder);
      },
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnUpdateSpecificOrder.unsubscribe();
    };
  }, []);

  return order;
};

export default useSpecificOrderSubscription;
