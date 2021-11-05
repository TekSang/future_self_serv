import React, { useState, useCallback, useContext, useEffect } from "react";

import {
  ListItemText,
  IconButton,
  Typography,
  Toolbar,
  Button,
  CssBaseline,
  AppBar,
  Container,
  LinearProgress,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useFullScreen } from "react-browser-hooks";
import useEventListener from "./hooks/useEventListener";
import GuestList from "./pages/guest/GuestList";
import Home from "./pages/guest/Home";
import Menu from "./pages/guest/Menu";
import Schedule from "./pages/guest/Schedule";
import { COLORS, PAGES, ORDER_STATUS, defaultState } from "./libs/constants";
import { Context } from "./context/contextActions";
import useSpecificOrderSubscription from "./hooks/useSpecificOrderSubscription";
import useWindowSize from "./hooks/useWindowSize";
import { _getEventByCode, _getAllUsersAtEvent, _getUser as getUser } from "./graphql_operations/queries";
import AppDrawer from "./components/AppDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: COLORS.white,
    width: "100vw",
    height: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: COLORS.white,
  },
  content: {
    flexGrow: 1,
    marginTop: 5,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  preview: {
    width: "100%",
    overflow: "auto",
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontWeight: "bolder",
    border: "none",
    "&:hover": {
      backgroundColor: COLORS.white,
      color: COLORS.orange,
    },
  },
  inline: {
    display: "inline",
  },
  card: { backgroundColor: COLORS.white, color: COLORS.orange },
}));

const coupleName = "Felicité & Mandela";
let dbUsers = [];

function BarApp(props) {
  //useOrderEventListener();
  useSpecificOrderSubscription();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usersAtEvent, setUsersAtEvent] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const {
    state: { currentPage, order, user, table },
    setOrderStatus,
    setEvent,

    setUser,
    setOrder,
    setCurrentPage,
  } = useContext(Context);
  const { toggle, fullScreen } = useFullScreen();
  const { width } = useWindowSize();

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    (event) => {
      if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
        toggle();
      }
    },
    [toggle, fullScreen]
  );

  useEventListener("click", handler);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function onLoad() {
    try {
      //* Set the Event
      const event = await _getEventByCode({ code: "azerty" });
      if (event) {
        setEvent(event);
        await getAllUsersAtEvent({ eventId: event.id });
        if (user) {
          //* If there's a user, verify he belongs to this event
          if (dbUsers.map((item) => item.user.id).includes(user.id)) {
            setFetchingData(false);
            setIsUserLoggedIn(true);
            let dbUser = await getUser({ id: user.id });
            if (dbUser) {
              let userState = JSON.parse(dbUser.userState);
              delete dbUser.userState;
              setUser(dbUser);
              setOrder(userState.order);
            }
          }
        }
      } else {
        localStorage.setItem("WEDDING_STATE", JSON.stringify(defaultState));
      }
    } catch (e) {
      console.log(e);
    }
    setFetchingData(false);
  }

  async function getAllUsersAtEvent({ nT, eventId }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, nextToken } : { eventId };
    try {
      let { users: fetchedUsers, nextToken: next } = await _getAllUsersAtEvent(params);

      if (fetchedUsers) dbUsers = dbUsers.concat(fetchedUsers);

      if (next) {
        await getAllUsersAtEvent({ nT: nextToken, eventId });
      } else {
        setUsersAtEvent(dbUsers);
        return;
      }

      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return fetchingData ? (
    <div className={classes.root}>
      <Container className={classes.content} style={{ marginTop: "50vh" }}>
        <LinearProgress color="secondary" />
      </Container>
    </div>
  ) : isUserLoggedIn ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            style={{ color: COLORS.black }}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ flexGrow: 1 }}>
            <ListItemText
              onClick={() => {
                console.log(order, PAGES.home);
                setCurrentPage(PAGES.home.path);
              }}
              primary={width > 800 ? table.name : coupleName}
              secondary={
                width > 800 ? null : (
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{ color: COLORS.black, fontWeight: "bold" }}
                  >
                    {table.name}
                  </Typography>
                )
              }
            />
          </div>
          {order.status !== ORDER_STATUS.IN_PROGRESS ? (
            currentPage === PAGES.menu.path ? (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  console.log("Send Order");
                  console.log(order);
                  setOrderStatus(ORDER_STATUS.INLINE);
                  setCurrentPage(PAGES.home.path);
                }}
              >
                {order.products.length > 0 ? "Send Order" : "Home"}
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  console.log("Edit Order");
                  console.log(order);

                  setCurrentPage(PAGES.menu.path);
                }}
              >
                {order.products.length > 0 ? "Edit Order" : "Menu"}
              </Button>
            )
          ) : (
            <Typography variant="body2" style={{ fontWeight: "bold", color: COLORS.orange }}>
              Order on the way
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <AppDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </nav>
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        {currentPage === PAGES.home.path && <Home />}
        {currentPage === PAGES.guestList.path && <GuestList guests={usersAtEvent} />}
        {currentPage === PAGES.menu.path && <Menu />}
        {currentPage === PAGES.schedule.path && <Schedule />}
      </Container>
    </div>
  ) : (
    <div className={classes.root}>
      <Container className={classes.content}>
        <GuestList guests={usersAtEvent} loginFunctionality={true} setIsUserLoggedIn={setIsUserLoggedIn} />
      </Container>
    </div>
  );
}

export default BarApp;
