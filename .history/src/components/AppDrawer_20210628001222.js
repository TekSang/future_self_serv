import React, { useState, useContext, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import {
  ListItemText,
  List,
  ListItem,
  Divider,
  Drawer,
  Hidden,
  Button,
  ButtonGroup,
  ListItemIcon,
} from "@material-ui/core";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { COLORS, PAGES, ORDER_STATUS, ORDER_ACTIONS } from "../libs/constants";
import { Context } from "../context/contextActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: COLORS.white,
  },
}));

const coupleName = "Felicité & Mandela";
function AppDrawer(props) {
  const { window, mobileOpen, setMobileOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [clickCounter, setClickCounter] = useState(0);

  const {
    state: { order, localOrders },
    setOrderStatus,
    setSwitchApps,
    setCurrentPage,
    setOrderAction,
  } = useContext(Context);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (clickCounter > 10) {
      setSwitchApps(true);
    }
  }, [clickCounter]); // eslint-disable-line react-hooks/exhaustive-deps

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

                  if (localOrders.length > 0) {
                    if (order.id) {
                      setOrderAction(ORDER_ACTIONS.UPDATE_ORDER_QUANTITIES);
                    } else {
                      setOrderAction(ORDER_ACTIONS.CREATE_ORDER);
                    }
                  } else {
                    if (order.id) {
                      setOrderAction(ORDER_ACTIONS.CANCEL_ORDER);
                    } else {
                      setOrderAction(ORDER_ACTIONS.RESET_ORDERS);
                    }
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
