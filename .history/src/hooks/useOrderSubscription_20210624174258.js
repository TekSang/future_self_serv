import { useEffect, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";

let dbOrders = [];

const useOrderSubscription = () => {
  const { state, setBarOrders } = useContext(Context);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        let newOrder = data.value.data.onUpdateOrder;
        console.log("NEW ORDER", newOrder);
        dbOrders = [...dbOrders.filter((o) => o.order.id !== newOrder.order.id), newOrder];
        setBarOrders(dbOrders);
      },
      error: (error) => console.warn(error),
    });
  }

  useEffect(() => {
    setupSubscriptions();
    dbOrders = state.barOrders;
    return () => {
      subscriptionOnUpdateOrder.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOrderSubscription;
