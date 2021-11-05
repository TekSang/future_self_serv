import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSpecificOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";

const useSpecificOrderSubscription = () => {
  const { state } = useContext(Context);
  const [order, updateOrder] = useState([]);
  const [orderId, updateOrderId] = useState(state.order.id);

  let subscriptionOnUpdateSpecificOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateSpecificOrder = API.graphql(graphqlOperation(onUpdateSpecificOrder, { orderId })).subscribe({
      next: (data) => {
        updateOrderId(data.value.data.onUpdateSpecificOrder);
        console.log(data.value.data.onUpdateSpecificOrder);
      },
      error: (error) => console.log(error),
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnUpdateSpecificOrder.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(orderId);
  }, [orderId]);

  return order;
};

export default useSpecificOrderSubscription;
