// Externals
import React, { useState, useContext, useEffect } from "react";
import { CssBaseline, Container, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

// libs, state, hooks, graphql operations
import { COLORS, PAGES, defaultState, ORDER_STATUS } from "./libs/constants";
import { Context } from "./context/contextActions";
import useSpecificOrderSubscription from "./hooks/useSpecificOrderSubscription";
import useOrderEventListener from "./hooks/useOrderEventListener";
import {
  _getEventByCode,
  _getAllUsersAtEvent,
  _getUser as getUser,
  _getOrdersByUser,
  _getAllProducts,
} from "./graphql_operations/queries";

// Components
import GuestList from "./pages/GuestList";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Schedule from "./pages/Schedule";
import AppDrawer from "./components/AppDrawer";
import TopBar from "./components/TopBar";

// Variables
const drawerWidth = 240;
let dbUsers = [];
let dbProducts = [];

// Style declarations
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

function BarApp(props) {
  // Hooks
  useOrderEventListener();
  useSpecificOrderSubscription();

  // Global state
  const {
    state: { currentPage, user, event, products },
    setEvent,
    setUser,
    setOrder,
    setProducts,
    setLocalOrders,
  } = useContext(Context);

  // Local state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usersAtEvent, setUsersAtEvent] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // variables
  const classes = useStyles();

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function onLoad() {
    // function is run when the component mounts
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
              setUser(dbUser);
              let { orders } = await _getOrdersByUser({
                eventId: event.id,
                id: user.id,
                statuses: [ORDER_STATUS.INLINE, ORDER_STATUS.CHOOSING, ORDER_STATUS.IN_PROGRESS],
              });
              let products = _.flatten(
                orders.map((o) => o.products.map((x) => ({ id: x.product.id, quantity: x.quantity })))
              );
              setLocalOrders(products);
              let dbOrder = orders[0];
              if (dbOrder) {
                setOrder({ ...dbOrder.order, products: dbOrder.products });
              } else {
                setOrder({ id: "", products: [], status: "" });
              }
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

  useEffect(() => {
    if (products.length > 0) {
      console.log(products);
    }
  }, [products]);

  useEffect(() => {
    getAllProducts({ eventId: event.id });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getAllProducts({ nT, eventId }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, nextToken } : { eventId };
    try {
      let { products: fetchedProducts, nextToken: next } = await _getAllProducts(params);

      if (fetchedProducts) dbProducts = dbProducts.concat(fetchedProducts);

      if (next) {
        await getAllProducts({ nT: nextToken, eventId });
      } else {
        dbProducts = _.uniqBy(dbProducts, "id");
        setProducts(dbProducts);
        return;
      }
      //console.log(dbProducts);
      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function getAllUsersAtEvent({ nT, eventId }) {
    // function gets all users at a given event
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
      <TopBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
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
