import React from "react";
import { Route, Switch } from "react-router-dom";

import { PAGES } from "./libs/constants";
import GuestList from "./pages/GuestList";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Schedule from "./pages/Schedule";
import NotFound from "./components/NotFound";

export default function PageRoutes() {
  return (
    <Switch>
      <Route exact path={PAGES.home.path} render={(props) => <Home {...props} />} />
      <Route exact path={PAGES.guestList.path} render={(props) => <GuestList {...props} />} />
      <Route exact path={PAGES.menu.path} render={(props) => <Menu {...props} />} />
      <Route exact path={PAGES.schedule.path} render={(props) => <Schedule {...props} />} />
      <Route render={(props) => <NotFound {...props} />} />
    </Switch>
  );
}
