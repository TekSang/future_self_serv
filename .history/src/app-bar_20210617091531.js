import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "./graphql/subscriptions";

const AppBar = () => {
  const [orders, updateOrders] = useState([]);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
      next: (data) => {
        /* const { value: { data: { onCreateTalk } }} = data
          const orderData = [...orders, onCreateTalk]
          updateOrders(orderData) */
        console.log(data);
      },
    });

    return () => subscription.unsubscribe();
  }, [orders]);
  return (
    <div>
      <h1>BAR APP</h1>
    </div>
  );
};

export default AppBar;
