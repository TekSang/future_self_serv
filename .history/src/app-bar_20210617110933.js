import React from "react";
import useOrderSubscription from "./hooks/useOrderSubscription";

const AppBar = () => {
  const orders = useOrderSubscription();

  console.log(orders);

  return (
    <div>
      <h1>BAR APP</h1>
    </div>
  );
};

export default AppBar;
