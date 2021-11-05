import React, { useContext } from "react";

import { ListItemText, IconButton, Typography, Toolbar, Button, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS, PAGES, ORDER_STATUS } from "./libs/constants";
import { Context } from "./context/contextActions";
import useWindowSize from "./hooks/useWindowSize";

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

function TopBar({ mobileOpen, setMobileOpen }) {
  const classes = useStyles();
  const {
    state: { currentPage, order, table },
    setOrderStatus,

    setCurrentPage,
  } = useContext(Context);

  const { width } = useWindowSize();

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
  );
}

export default TopBar;
