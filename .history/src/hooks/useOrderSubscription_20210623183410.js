import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";
import { ORDER_STATUS } from "../libs/constants";
import { _getAllOrdersByStatus } from "../graphql_operations/queries";
//import _ from "lodash";

let dbOrders = [];

const useOrderSubscription = () => {
  const { setBarOrders } = useContext(Context);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        let newOrder = data.value.data.onUpdateOrder;
        dbOrders = [...dbOrders.filter((o) => o.order.id !== newOrder.order.id), newOrder];
        console.log(newOrder);
        setBarOrders(dbOrders);
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
};

export default useOrderSubscription;
