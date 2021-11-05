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

import GuestList from "./pages/guest/GuestList";
import Home from "./pages/guest/Home";
import Menu from "./pages/guest/Menu";
import Schedule from "./pages/guest/Schedule";

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
function AppDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);

  const {
    state: { order },
    setOrderStatus,

    setCurrentPage,
  } = useContext(Context);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
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

                  setCurrentPage(PAGES.home.path);
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
                    setCurrentPage(PAGES.menu.path);
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

                  setCurrentPage(PAGES.schedule.path);
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
                  setCurrentPage(PAGES.guestList.path);
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

                  setCurrentPage(PAGES.home.path);
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
                    setCurrentPage(PAGES.menu.path);
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

                  setCurrentPage(PAGES.schedule.path);
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
                  setCurrentPage(PAGES.guestList.path);
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
        </Drawer>
      </Hidden>
    </>
  );
}

export default AppDrawer;
