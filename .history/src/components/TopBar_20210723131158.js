import React, { useContext } from "react";

import { ListItemText, IconButton, Typography, Toolbar, Button, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS, PAGES, ORDER_STATUS, ORDER_ACTIONS } from "../libs/constants";
import { Context } from "../context/contextActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  button: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontWeight: "bolder",
    fontSize: 11,
    border: "none",
  },
  inline: {
    display: "inline",
  },
}));

function TopBar({ mobileOpen, setMobileOpen }) {
  const classes = useStyles();
  const {
    state: { currentPage, event, order, table, localOrders, user },
    setOrderAction,
    setCurrentPage,
  } = useContext(Context);

  const isDayOfEvent = process.env.NODE_ENV.includes("dev")
    ? true
    : Date.now() >= new Date(new Date(event.dateOfEvent).toDateString()).getTime();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
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
            primary={table.name}
            secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                style={{ color: COLORS.black, fontWeight: "bold" }}
              >
                {user.firstName} {user.lastName}
              </Typography>
            }
          />
        </div>
        {isDayOfEvent ? (
          order.status !== ORDER_STATUS.IN_PROGRESS ? (
            currentPage === PAGES.menu.path ? (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  console.log("Send Order");
                  if (localOrders.length > 0) {
                    if (order.id) {
                      setOrderAction(ORDER_ACTIONS.UPDATE_ORDER_QUANTITIES);
                    } else {
                      setOrderAction(ORDER_ACTIONS.CREATE_ORDER);
                      console.log("1", Math.random());
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
                {localOrders.length > 0 ? "Envoyer la Commande" : "Accueil"}
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  if (order.id) {
                    setOrderAction(ORDER_ACTIONS.UPDATE_ORDER_TO_CHOOSING);
                  }

                  setCurrentPage(PAGES.menu.path);
                }}
              >
                {localOrders.length > 0 ? "Modifier la Commande" : "Menu"}
              </Button>
            )
          ) : (
            <Typography variant="body2" style={{ fontWeight: "bold", color: COLORS.orange }}>
              Commande en route
            </Typography>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
