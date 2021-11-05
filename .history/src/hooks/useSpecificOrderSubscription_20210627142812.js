import { useEffect, useContext } from "react";
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
      next: ({
        value: {
          data: {
            onUpdateSpecificOrder: { order },
          },
        },
      }) => {
        console.log(order);
      },
      error: (error) => console.log(error),
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      console.log("Unsubscribe from specific order");
      subscriptionOnUpdateSpecificOrder.unsubscribe();
    };
  }, [state.order.id]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSpecificOrderSubscription;
