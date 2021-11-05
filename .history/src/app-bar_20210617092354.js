import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "./graphql/subscriptions";

const AppBar = () => {
  const [orders, updateOrders] = useState([]);

  return (
    <div>
      <h1>BAR APP</h1>
    </div>
  );
};

export default AppBar;
