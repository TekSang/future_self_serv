// External dependencies
import React, { useContext, useEffect, useCallback } from "react";
import { useFullScreen } from "react-browser-hooks";

// Libs, state and graphql operations
import { Context } from "./context/contextActions";
import { PAGES } from "./libs/constants";
import useEventListener from "./hooks/useEventListener";

// Components
import BarApp from "./bar-app";
import GuestApp from "./guest-app";

function App(props) {
  // Global state
  const {
    state: { switchApps, currentPage },
    setBarOrders,
    setSwitchApps,
  } = useContext(Context);

  // Local state
  const { toggle, fullScreen } = useFullScreen();

  // hooks
  useEventListener(
    "click",
    useCallback(
      // Event handler utilizing useCallback ...
      // ... so that reference never changes.
      (event) => {
        console.log("touched");
        if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
          toggle();
        }
      },
      [toggle, fullScreen]
    )
  );

  useEffect(() => {
    if (currentPage === PAGES.bar.path) {
      setSwitchApps(true);
    } else {
      setSwitchApps(false);
    }

    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return switchApps ? <BarApp /> : <GuestApp />;
}

export default App;
