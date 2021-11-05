import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSpecificOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";

const useSpecificOrderSubscription = () => {
  const { state, setOrderStatus } = useContext(Context);
  const [order, updateOrder] = useState([]);

  let subscriptionOnUpdateSpecificOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateSpecificOrder = API.graphql(
      graphqlOperation(onUpdateSpecificOrder, { orderId: state.order.id ? state.order.id : "test" })
    ).subscribe({
      next: (data) => {
        setOrderStatus(data.value.data.onUpdateSpecificOrder.order.order.status + "d");
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
    console.log(state.order.id);
  }, [state.order.id]);

  return order;
};

export default useSpecificOrderSubscription;
