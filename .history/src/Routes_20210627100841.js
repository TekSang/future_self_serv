import React from "react";
import { Route, Switch } from "react-router-dom";

//import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import { PAGES } from "./libs/constants";
import GuestList from "./pages/guest";
import Home from "./pages/guest";
import Menu from "./pages/guest";
import Schedule from "./pages/guest";
import NotFound from "./components/NotFound";

export default function PageRoutes() {
  return (
    <Switch>
      <Route exact path={PAGES.home} render={(props) => <Home {...props} />} />
      <Route exact path={PAGES.guestList} render={(props) => <GuestList {...props} />} />
      <Route exact path={PAGES.menu} render={(props) => <Menu {...props} />} />
      <Route exact path={PAGES.schedule} render={(props) => <Schedule {...props} />} />
      <Route render={(props) => <NotFound {...props} />} />
    </Switch>
  );
}
