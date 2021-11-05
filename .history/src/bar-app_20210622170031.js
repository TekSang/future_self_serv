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
import _ from "lodash";
import { _getAllOrdersByStatus } from "./graphql_operations/queries";

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

function GridCell({ table, index }) {
  const classes = useStyles();
  const [time, setTimer] = useState(0);

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

  console.log("sss");

  return (
    <Grid item>
      <Paper
        className={classes.paper}
        style={{
          overflow: "auto",
          border: `0.5px solid ${COLORS.redLight}`,
        }}
      >
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {} - {time}
        </Typography>
        <List dense={true}>
          {[1, 2, 3, 4, 5, 6, 7].map((item) => {
            return (
              <ListItem>
                <ListItemText primary="Item Name" />
                <ListItemText style={{ textAlign: "end" }} primary={item} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Grid>
  );
}

let dbOrders = [];

export default function BarApp() {
  const subscribeEvent = useOrderSubscription();
  const classes = useStyles();
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  console.log("🚀 ~ file: bar-app.js ~ line 121 ~ BarApp ~ fetchedOrders", fetchedOrders);

  useEffect(() => {
    getAllOrdersByStatus();
    return () => {
      console.log("cleanup");
    };
  }, [subscribeEvent]);

  useEffect(() => {
    sortOrders();
  }, [fetchedOrders]);

  async function getAllOrdersByStatus({ nT, eventId, status }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, nextToken, status } : { eventId, status };
    try {
      let { orders: newFetchedOrders, nextToken: next } = await _getAllOrdersByStatus(params);

      if (newFetchedOrders) dbOrders = dbOrders.concat(newFetchedOrders);

      if (next) {
        await getAllOrdersByStatus({ nT: nextToken, eventId, status });
      } else {
        setFetchedOrders(dbOrders);
        return;
      }

      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function sortOrders() {}

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
        xs={12}
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
          spacing={2}
          justify="space-around"
          alignItems="center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Grid item xs={4} spacing={1} container direction="column">
            {orders
              .filter((o) => o[ORDER_STATUS.INLINE] === ORDER_STATUS.INLINE)
              .map((o) => {
                return <GridCell />;
              })}
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            {orders
              .filter((o) => o[ORDER_STATUS.INLINE] === ORDER_STATUS.INLINE)
              .map((o) => {
                return <GridCell />;
              })}
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            {orders
              .filter((o) => o[ORDER_STATUS.INLINE] === ORDER_STATUS.INLINE)
              .map((o) => {
                return <GridCell />;
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
