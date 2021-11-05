import React, { useEffect, useState } from "react";
import {
  InputBase,
  Toolbar,
  CssBaseline,
  AppBar,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import faker from "faker";

import useOrderSubscription from "./hooks/useOrderSubscription";
import { COLORS, ORDER_STATUS } from "./libs/constants";
import { mock_orders } from "./mocks/orders";

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
    },
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  grid: {
    marginTop: 100,
    backgroundColor: COLORS.white,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function GridRow({ order, index }) {
  const classes = useStyles();
  const inline = order[ORDER_STATUS.INLINE];
  const choosing = order[ORDER_STATUS.CHOOSING];
  const inprogress = order[ORDER_STATUS.IN_PROGRESS];
  const [time, setTimer] = useState({
    inline: inline ? inline.date : 0,
    choosing: choosing ? choosing.date : 0,
    inprogress: inprogress ? inprogress.date : 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer({
        inline: new Date(Date.now() - time.inline).toISOString().substr(14, 5),
        choosing: new Date(Date.now() - time.choosing).toISOString().substr(14, 5),
        inprogress: new Date(Date.now() - time.inprogress).toISOString().substr(14, 5),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <React.Fragment>
      {inline && (
        <Grid item xs={4}>
          <Paper
            className={classes.paper}
            style={{
              height: (inline.products.length + 1) * 40,
              overflow: "auto",
              border: `0.5px solid ${COLORS.redLight}`,
            }}
          >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {inline.table} - {time.inline}
            </Typography>
            <List dense={true}>
              {inline.products.map((item) => {
                return (
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <ListItemText style={{ textAlign: "end" }} primary={item.quantity} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      )}
      {choosing && (
        <Grid item xs={4}>
          <Paper
            className={classes.paper}
            style={{
              height: (choosing.products.length + 1) * 40,
              overflow: "auto",
              border: `0.5px solid ${COLORS.yellowLight}`,
            }}
          >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {choosing.table} - {time.choosing}
            </Typography>
            <List dense={true}>
              {choosing.products.map((item) => {
                return (
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <ListItemText style={{ textAlign: "end" }} primary={item.quantity} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      )}
      {inprogress && (
        <Grid item xs={4}>
          <Paper
            className={classes.paper}
            style={{
              height: (inprogress.products.length + 1) * 40,
              overflow: "auto",
              border: `0.5px solid ${COLORS.greenDark}`,
            }}
          >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {inprogress.table} - {time.inprogress}
            </Typography>
            <List dense={true}>
              {inprogress.products.map((item) => {
                return (
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <ListItemText style={{ textAlign: "end" }} primary={item.quantity} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default function BarApp() {
  const orders = useOrderSubscription();
  const classes = useStyles();
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    setSortedOrders(sortOrders(mock_orders));
    return () => {
      console.log("clean up");
    };
  }, [orders]);

  function sortOrders(givenOrders) {
    let sorted = [];
    let inlineOrders = [];
    let inprogressOrders = [];
    let choosingOrders = [];

    for (const order of givenOrders) {
      switch (order.status) {
        case ORDER_STATUS.CHOOSING:
          choosingOrders = [...choosingOrders, order];
          break;
        case ORDER_STATUS.IN_PROGRESS:
          inprogressOrders = [...inprogressOrders, order];
          break;
        case ORDER_STATUS.INLINE:
          inlineOrders = [...inlineOrders, order];
          break;
        default:
          break;
      }
    }

    const longestStatusArray = Math.max(inlineOrders.length, Math.max(choosingOrders.length, inprogressOrders.length));

    for (var i = 0; i < longestStatusArray; i++) {
      var inline = inlineOrders[i];
      var inprogress = inprogressOrders[i];
      var choosing = choosingOrders[i];
      var orderWithStatus = { key: faker.random.alphaNumeric(15) };
      if (inline) {
        orderWithStatus[ORDER_STATUS.INLINE] = inline;
      }
      if (inprogress) {
        orderWithStatus[ORDER_STATUS.IN_PROGRESS] = inprogress;
      }
      if (choosing) {
        orderWithStatus[ORDER_STATUS.CHOOSING] = choosing;
      }

      sorted = [...sorted, orderWithStatus];
    }

    return sorted;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <InputBase
              placeholder="table name..."
              onChange={(e) => {
                console.log("search", e.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={1}
        className={classes.grid}
        direction="column"
        item
        justify="space-around"
        alignItems="center"
      >
        <Grid
          direction="row"
          container
          item
          justify="space-around"
          alignItems="center"
          xs={12}
          spacing={3}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={{ background: `linear-gradient(45deg, ${COLORS.redLight} 30%, ${COLORS.redLight} 90%)` }}
            >
              <Typography variant="h5" gutterBottom>
                INLINE
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={{ background: `linear-gradient(45deg, ${COLORS.yellowLight} 30%, ${COLORS.yellowLight} 90%)` }}
            >
              <Typography variant="h5" gutterBottom>
                CHOOSING
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={{ background: `linear-gradient(45deg, ${COLORS.greenLight} 30%, ${COLORS.greenLight} 90%)` }}
            >
              <Typography variant="h5" gutterBottom>
                IN PROGRESS
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          direction="row"
          container
          item
          xs={12}
          spacing={3}
          justify="space-around"
          alignItems="stretch"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Grid item xs={4} spacing={1} direction="column">
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginRight: "auto", width: "inherit" }}>
              <Paper className={classes.paper}></Paper>
            </Grid>
          </Grid>
        </Grid>
        {/*         {sortedOrders.map((order, i) => {
          return (
            <>
              <Grid container item xs={12} spacing={3}>
                <GridRow key={order.key} index={i} order={order} />
              </Grid>
            </>
          );
        })} */}
      </Grid>
    </div>
  );
}
