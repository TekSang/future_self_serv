import { useEffect, useState, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "../graphql/subscriptions";
import { Context } from "../context/contextActions";
import { ORDER_STATUS } from "../libs/constants";
import { _getAllOrdersByStatus } from "../graphql_operations/queries";
//import _ from "lodash";

let dbOrders = [];

const useOrderSubscription = () => {
  const { state, setBarOrders } = useContext(Context);
  const [count, addCount] = useState(0);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        let newOrder = data.value.data.onUpdateOrder;
        let updated = [...state.barOrders, newOrder];

        setBarOrders(updated);
      },
      error: (error) => console.warn(error),
    });
  }

  /*   useEffect(() => {
    dbOrders = []; 
    setBarOrders([]);
    let statuses = [ORDER_STATUS.INLINE, ORDER_STATUS.CHOOSING, ORDER_STATUS.IN_PROGRESS];

    for (var i = 0; i < statuses.length; i++) {
      getAllOrdersByStatus({ eventId: state.event.id, status: statuses[i] });
    }
  }, [count]);

  async function getAllOrdersByStatus({ nT, eventId, status }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, status, nextToken } : { eventId, status };
    try {
      let { orders: fetchedOrders, nextToken: next } = await _getAllOrdersByStatus(params)

      if (fetchedOrders) {
        dbOrders = dbOrders.concat(fetchedOrders);
      }

      if (next) {
        await getAllOrdersByStatus({ nT: nextToken, eventId, status });
      } else {
        setBarOrders([...state.barOrders, ...dbOrders]);
        console.log(dbOrders);
        return;
      }

      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  } */

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnUpdateOrder.unsubscribe();
    };
  }, []);
};

export default useOrderSubscription;
