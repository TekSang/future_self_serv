// External dependencies
import React, { useContext, useEffect, useCallback } from "react";
import { useFullScreen } from "react-browser-hooks";

// Libs, state and graphql operations
import { Context } from "./context/contextActions";
import useEventListener from "./hooks/useEventListener";

// Components
import GuestApp from "./guest-app";

function App(props) {
  // Global state
  const { setBarOrders } = useContext(Context);

  // Local state
  const { toggle, fullScreen } = useFullScreen();

  // hooks
  useEventListener(
    "click",
    useCallback(
      // Event handler utilizing useCallback ...
      // ... so that reference never changes.
      (event) => {
        if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
          toggle();
        }
      },
      [toggle, fullScreen]
    )
  );

  useEffect(() => {
    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <GuestApp />;
}

export default App;
