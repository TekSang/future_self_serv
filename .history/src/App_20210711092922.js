// External dependencies
import React, { useContext, useEffect, useCallback } from "react";
import { useFullScreen } from "react-browser-hooks";

// Libs, state and graphql operations
import { Context } from "./context/contextActions";
import useEventListener from "./hooks/useEventListener";

// Components
import GuestApp from "./guest-app";
import WelcomeImage from "./components/WelcomeImage";
import { coupleName } from "./libs/constants";

function App(props) {
  // Global state
  const {
    state: { event },
    setBarOrders,
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
        if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
          toggle();
        }
      },
      [toggle, fullScreen]
    )
  );

  const setupEvent = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h5>Our Day presents</h5>
      <WelcomeImage size={300} title={coupleName} />
    </div>
  );

  useEffect(() => {
    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return event.id ? <GuestApp /> : setupEvent;
}

export default App;
