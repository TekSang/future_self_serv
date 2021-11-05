import { useEffect, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSpecificOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";
import { ORDER_STATUS } from "../libs/constants";

const useSpecificOrderSubscription = () => {
  const { state, setOrder, setOrderStatus } = useContext(Context);

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
        console.log("ON update specific order", order);
        let { status } = order;

        if (status === ORDER_STATUS.COMPLETED || status === ORDER_STATUS.CANCELLED) {
          setOrder({ id: "", products: [], status });
        } else {
          setOrderStatus(status);
        }
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
