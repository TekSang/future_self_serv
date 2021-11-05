import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";
//import _ from "lodash";

const useOrderSubscription = () => {
  const { state, setBarOrders } = useContext(Context);
  const [orders, updateOrders] = useState(state.barOrders);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        let newOrder = data.value.data.onUpdateOrder;

        let updated = [...orders, newOrder];
        console.log(
          "🚀 ~ file: useOrderSubscription.js ~ line 19 ~ subscriptionOnUpdateOrder=API.graphql ~ updated",
          updated
        );
        updateOrders(updated);
        setBarOrders(updated);
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