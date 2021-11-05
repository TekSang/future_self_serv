import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { ListItemText, List, ListItem, Divider, Drawer, Hidden, ListItemIcon } from "@material-ui/core";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { COLORS, PAGES, ORDER_STATUS, ORDER_ACTIONS, coupleName } from "../libs/constants";
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

function AppDrawer(props) {
  const { window, mobileOpen, setMobileOpen } = props;
  const classes = useStyles();
  const theme = useTheme();

  const {
    state: { order, localOrders, currentPage, event },
    setCurrentPage,
    setOrderAction,
  } = useContext(Context);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  console.log(Date.now() < new Date(new Date(event.dateOfEvent).toDateString()).getTime());

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
              <ListItem>
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
                  console.log(currentPage);
                  if (localOrders.length > 0 && currentPage === PAGES.menu.path) {
                    if (order.id) {
                      setOrderAction(ORDER_ACTIONS.UPDATE_ORDER_QUANTITIES);
                    } else {
                      setOrderAction(ORDER_ACTIONS.CREATE_ORDER);
                      console.log(2, Math.random());
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
                    if (order.id) {
                      setOrderAction(ORDER_ACTIONS.UPDATE_ORDER_TO_CHOOSING);
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
              {
                <ListItem
                  button
                  onClick={() => {
                    if (mobileOpen) {
                      setMobileOpen(!mobileOpen);
                    }
                    setCurrentPage(PAGES.guestList.path);
                  }}
                >
                  <ListItemIcon>
                    <EventSeatIcon style={{ color: COLORS.black }} />
                  </ListItemIcon>
                  <ListItemText primary={PAGES.guestList.name} />
                </ListItem>
              }
            </List>
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
              <ListItem>
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
          </div>
        </Drawer>
      </Hidden>
    </>
  );
}

export default AppDrawer;
