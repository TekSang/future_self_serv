/* import { useEffect, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";

const useOrderSubscription = () => {
  const { setFetchOrders } = useContext(Context);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        setFetchOrders(true);
      },
      error: (error) => console.warn(error),
    });
  }

  useEffect(() => {
    setupSubscriptions();
    return () => {
      subscriptionOnUpdateOrder.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOrderSubscription;
 */
