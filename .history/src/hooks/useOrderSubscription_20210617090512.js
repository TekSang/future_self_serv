import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";

const useOrderSubscription = () => {
  const [orders, updateOrders] = useState([]);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        /* const { value: { data: { onCreateTalk } }} = data
          const orderData = [...orders, onCreateTalk]
          updateOrders(orderData) */
        console.log(data);
      },
    });

    return () => subscription.unsubscribe();
  }, [orders]);

  return orders;
};

export default useOrderSubscription;
