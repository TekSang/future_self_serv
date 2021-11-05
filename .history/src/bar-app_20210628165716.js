import React, { useEffect, useContext, useState } from "react";
import { InputBase, Toolbar, CssBaseline, AppBar, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

import useOrderSubscription from "./hooks/useOrderSubscription";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateOrder } from "./graphql/subscriptions";
import Column from "./components/Column";

import { COLORS, ORDER_STATUS, PAGES } from "./libs/constants";
import { Context } from "./context/contextActions";
import { getSortedOrders } from "./libs/functions";
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
    color: COLORS.black,
  },
  inputRoot: {
    color: "inherit",
  },
  tableHover: {
    "&:hover": {
      backgroundColor: COLORS.white,
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

let dbOrders = [];

export default function BarApp() {
  useOrderSubscription();
  //* Styles
  const classes = useStyles();

  //* Global state
  const { state, setBarOrders, setCurrentPage, setSwitchApps, setFetchOrders } = useContext(Context);

  //* all orders active orders in the system categorized by status
  const [inlineOrders, setInlineOrders] = useState([]);
  const [inprogressOrders, setInProgressOrders] = useState([]);
  const [choosingOrders, setChoosingOrders] = useState([]);

  async function onLoad() {
    let statuses = [ORDER_STATUS.CHOOSING, ORDER_STATUS.INLINE, ORDER_STATUS.IN_PROGRESS];
    getAllOrdersByStatus({ eventId: state.event.id, statuses });
    /* setupSubscriptions(); */
    setCurrentPage(PAGES.bar.path);
  }

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.fetchOrders) {
      let statuses = [ORDER_STATUS.CHOOSING, ORDER_STATUS.INLINE, ORDER_STATUS.IN_PROGRESS];
      getAllOrdersByStatus({ eventId: state.event.id, statuses });
      setFetchOrders(false);
    }
  }, [state.fetchOrders]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let inline = getSortedOrders(state.barOrders)[ORDER_STATUS.INLINE];
    let choosing = getSortedOrders(state.barOrders)[ORDER_STATUS.CHOOSING];
    let inprogress = getSortedOrders(state.barOrders)[ORDER_STATUS.IN_PROGRESS];

    setInlineOrders(inline ? inline : []);
    setChoosingOrders(choosing ? choosing : []);
    setInProgressOrders(inprogress ? inprogress : []);
  }, [state.barOrders]);

  async function getAllOrdersByStatus({ nT, eventId, statuses }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, statuses, nextToken } : { eventId, statuses };
    try {
      let { orders: fetchedOrders, nextToken: next } = await _getAllOrdersByStatus(params);

      console.log(
        "fetch orders",
        fetchedOrders.map((o) => ({
          /* order: o.order.status,
          product: o.products.map((x) => ({ name: x.product.name, quantity: x.quantity })),
          table: o.table.name,
           */ user: o.user.firstName,
        }))
      );

      if (fetchedOrders) dbOrders = [...dbOrders, ...fetchedOrders];

      if (next) {
        await getAllOrdersByStatus({ nT: nextToken, eventId, statuses });
      } else {
        setBarOrders(dbOrders);

        dbOrders = [];
        return;
      }

      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
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
                if (e.target.value.toLocaleLowerCase() === "switch app") {
                  setSwitchApps(false);
                }
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
          alignItems="flex-start"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {state.barOrders.length > 0 ? (
            <>
              <Column orders={inlineOrders} status={ORDER_STATUS.INLINE} />
              <Column orders={choosingOrders} status={ORDER_STATUS.CHOOSING} />
              <Column orders={inprogressOrders} status={ORDER_STATUS.IN_PROGRESS} />
            </>
          ) : (
            <Typography style={{ fontSize: 70, marginTop: "100px" }}>Relax, there're no orders :)</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
