import React, { useContext, useEffect } from "react";

import { Context } from "./context/contextActions";
import BarApp from "./bar-app";
import GuestApp from "./guest-app";
import { PAGES } from "./libs/constants";

function App(props) {
  const {
    state: { switchApps, currentPage },
    setBarOrders,
    setSwitchApps,
    setCurrentPage,
  } = useContext(Context);

  useEffect(() => {
    if (currentPage === PAGES.bar.path) {
      setSwitchApps(true);
    } else {
      setSwitchApps(false);
    }

    setCurrentPage(PAGES.home.path);

    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /*   useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps */

  return switchApps ? <BarApp /> : <GuestApp />;
}

export default App;