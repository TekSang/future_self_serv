import React from "react";
import userOrderSubscription from "./hooks/useOrderSubscription";

const AppBar = () => {
  const {} = userOrderSubscription();
  return (
    <div>
      <h1>BAR APP</h1>
    </div>
  );
};

export default AppBar;
