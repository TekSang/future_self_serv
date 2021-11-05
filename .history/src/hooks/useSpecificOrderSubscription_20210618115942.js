import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSpecificOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";

const useSpecificOrderSubscription = () => {
  const { state, setOrderStatus } = useContext(Context);

  let subscriptionOnUpdateSpecificOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateSpecificOrder = API.graphql(
      graphqlOperation(onUpdateSpecificOrder, { orderId: state.order.id ? state.order.id : "test" })
    ).subscribe({
      next: (data) => {
        let status = data.value.data.onUpdateSpecificOrder.order.order.status;
        if (status) {
          if (status !== state.order.status) {
            setOrderStatus(status);
          }
        }
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
};

export default useSpecificOrderSubscription;
