import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "./graphql/subscriptions";

const AppBar = () => {
  const [orders, updateOrders] = useState([]);

  let subscriptionOnUpdateOrder;

  function setupSubscriptions() {
    subscriptionOnUpdateOrder = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnUpdateOrder.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>BAR APP</h1>
    </div>
  );
};

export default AppBar;
