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
import MenuIcon from "@material-ui/icons/Menu";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useFullScreen } from "react-browser-hooks";
import useEventListener from "./hooks/useEventListener";
import Home from "./pages/guest/Home";
import GuestList from "./pages/guest/GuestList";
import Menu from "./pages/guest/Menu";
import Schedule from "./pages/guest/Schedule";
import { COLORS, PAGES, ORDER_STATUS, defaultState } from "./libs/constants";
import { Context } from "./context/contextActions";
import useOrderEventListener from "./hooks/useOrderEventListener";
import useSpecificOrderSubscription from "./hooks/useSpecificOrderSubscription";
import useWindowSize from "./hooks/useWindowSize";
import { _getEventByCode, _getAllUsersAtEvent } from "./graphql_operations/queries";

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

function Drawer(props) {
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
    setCurrentPage,
    setOrderStatus,
    setEvent,
    setSwitchApps,
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

  return (
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
            setCurrentPage(PAGES.home);
          }}
        >
          <ListItemIcon>
            <HomeIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.home} />
        </ListItem>
        {order.status !== ORDER_STATUS.IN_PROGRESS && (
          <ListItem
            button
            onClick={() => {
              if (mobileOpen) {
                setMobileOpen(!mobileOpen);
              }
              console.log(order, PAGES.menu);
              setCurrentPage(PAGES.menu);
            }}
          >
            <ListItemIcon>
              <LocalBarIcon style={{ color: COLORS.black }} />
            </ListItemIcon>
            <ListItemText primary={PAGES.menu} />
          </ListItem>
        )}
        <ListItem
          button
          onClick={() => {
            if (mobileOpen) {
              setMobileOpen(!mobileOpen);
            }
            console.log(order, PAGES.schedule);
            setCurrentPage(PAGES.schedule);
          }}
        >
          <ListItemIcon>
            <ScheduleIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.schedule} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            if (mobileOpen) {
              setMobileOpen(!mobileOpen);
            }
            console.log(order, PAGES.guestList);
            setCurrentPage(PAGES.guestList);
          }}
        >
          <ListItemIcon>
            <EventSeatIcon style={{ color: COLORS.black }} />
          </ListItemIcon>
          <ListItemText primary={PAGES.guestList} />
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
}

export default Drawer;
