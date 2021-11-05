import React, { useContext, useEffect } from "react";

import { Context } from "./context/contextActions";

import BarApp from "./bar-app";
import GuestApp from "./guest-app";

function App(props) {
  const {
    state: { switchApps },
    setBarOrders,
    setSwitchApps,
  } = useContext(Context);

  useEffect(() => {
    setSwitchApps(false);
    setBarOrders([]);
    return () => {
      setBarOrders([]);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return switchApps ? <BarApp /> : <GuestApp />;
}

export default App;
