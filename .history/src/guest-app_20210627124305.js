import React, { useState, useCallback, useContext, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import {
  ListItemText,
  List,
  ListItem,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Typography,
  Toolbar,
  Button,
  ButtonGroup,
  CssBaseline,
  AppBar,
  ListItemIcon,
  Container,
  LinearProgress,
} from "@material-ui/core";
import GuestRoutes from "./GuestRoutes";
import MenuIcon from "@material-ui/icons/Menu";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useFullScreen } from "react-browser-hooks";
import useEventListener from "./hooks/useEventListener";
import { useHistory } from "react-router-dom";

import GuestList from "./pages/guest/GuestList";

import { COLORS, PAGES, ORDER_STATUS, defaultState } from "./libs/constants";
import { Context } from "./context/contextActions";
import useOrderEventListener from "./hooks/useOrderEventListener";
import useSpecificOrderSubscription from "./hooks/useSpecificOrderSubscription";
import useWindowSize from "./hooks/useWindowSize";
import { _getEventByCode, _getAllUsersAtEvent, _getUser as getUser } from "./graphql_operations/queries";

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
  useOrderEventListener();
  useSpecificOrderSubscription();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);
  const [usersAtEvent, setUsersAtEvent] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const {
    state: { currentPage, order, user, table },
    setOrderStatus,
    setEvent,
    setSwitchApps,
  } = useContext(Context);
  const { toggle, fullScreen } = useFullScreen();
  const { width } = useWindowSize();
  const history = useHistory();

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
    if (clickCounter > 10) {
      setSwitchApps(true);
    }
  }, [clickCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function onLoad() {
    try {
      //* Set the Event
      const event = await _getEventByCode({ code: "azerty" });
      if (event) {
        console.log(event);
        setEvent(event);
        await getAllUsersAtEvent({ eventId: event.id });
        if (user) {
          let dbUser = await getUser({ id: user.id });
          console.log(dbUser);
          //* If there's a user, verify he belongs to this event
          if (dbUsers.map((item) => item.user.id.toLowerCase()).includes(user.id.toLowerCase())) {
            setFetchingData(false);
            setIsUserLoggedIn(true);
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

  const drawer = (
    <div>
      <List>
        <ListItem
          button
          onClick={() => {
            setClickCounter(clickCounter + 1);
          }}
        >
          <ListItemText primary={coupleName} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            if (mobileOpen) {
              setMobileOpen(!mobileOpen);
            }
            console.log(order, PAGES.home);
            history.push(PAGES.home.path);
          }}
        >
          <ListItemIcon>
            <HomeIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.home.name} />
        </ListItem>
        {order.status !== ORDER_STATUS.IN_PROGRESS && (
          <ListItem
            button
            onClick={() => {
              if (mobileOpen) {
                setMobileOpen(!mobileOpen);
              }
              console.log(order, PAGES.menu);
              history.push(PAGES.menu.path);
            }}
          >
            <ListItemIcon>
              <LocalBarIcon style={{ color: COLORS.black }} />
            </ListItemIcon>
            <ListItemText primary={PAGES.menu.name} />
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => {
            if (mobileOpen) {
              setMobileOpen(!mobileOpen);
            }
            console.log(order, PAGES.schedule);
            history.push(PAGES.schedule.path);
          }}
        >
          <ListItemIcon>
            <ScheduleIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.schedule.name} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            if (mobileOpen) {
              setMobileOpen(!mobileOpen);
            }
            console.log(order, PAGES.guestList);
            history.push(PAGES.guestList.path);
          }}
        >
          <ListItemIcon>
            <EventSeatIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.guestList.name} />
        </ListItem>
      </List>

      {process.env.NODE_ENV.includes("dev") && (
        <ButtonGroup
          style={{ marginLeft: "50px" }}
          orientation="vertical"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          <Button
            onClick={() => {
              setOrderStatus(ORDER_STATUS.CANCELLED);
            }}
          >
            {ORDER_STATUS.CANCELLED}
          </Button>
          <Button
            onClick={() => {
              setOrderStatus(ORDER_STATUS.CHOOSING);
            }}
          >
            {ORDER_STATUS.CHOOSING}
          </Button>
          <Button
            onClick={() => {
              setOrderStatus(ORDER_STATUS.COMPLETED);
            }}
          >
            {ORDER_STATUS.COMPLETED}
          </Button>
          <Button
            onClick={() => {
              setOrderStatus(ORDER_STATUS.INLINE);
            }}
          >
            {ORDER_STATUS.INLINE}
          </Button>
          <Button
            onClick={() => {
              setOrderStatus(ORDER_STATUS.IN_PROGRESS);
            }}
          >
            {ORDER_STATUS.IN_PROGRESS}
          </Button>
        </ButtonGroup>
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
                history.push(PAGES.home);
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
                  history.push(PAGES.home.path);
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

                  history.push(PAGES.menu.path);
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
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        <GuestRoutes />
        {/* {currentPage === PAGES.home && <Home />}
        {currentPage === PAGES.guestList && <GuestList guests={usersAtEvent} />}
        {currentPage === PAGES.menu && <Menu />}
        {currentPage === PAGES.schedule && <Schedule />} */}
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
