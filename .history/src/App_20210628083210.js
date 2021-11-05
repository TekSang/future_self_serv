import React, { useContext, useEffect, useCallback } from "react";

import { Context } from "./context/contextActions";
import BarApp from "./bar-app";
import GuestApp from "./guest-app";
import { PAGES } from "./libs/constants";
import { useFullScreen } from "react-browser-hooks";
import useEventListener from "./hooks/useEventListener";

function App(props) {
  const {
    state: { switchApps, currentPage },
    setBarOrders,
    setSwitchApps,
  } = useContext(Context);

  const { toggle, fullScreen } = useFullScreen();

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    (event) => {
      console.log(event);
      if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
        toggle();
      }
    },
    [toggle, fullScreen]
  );

  useEventListener("click", handler);

  useEffect(() => {
    if (currentPage === PAGES.bar.path) {
      setSwitchApps(true);
    } else {
      setSwitchApps(false);
    }

    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /*   useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps */

  return switchApps ? <BarApp /> : <GuestApp />;
}

export default App;
