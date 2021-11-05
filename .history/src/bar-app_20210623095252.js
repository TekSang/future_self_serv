import React, { useEffect, useState, useContext } from "react";
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
import _ from "lodash";

import useOrderSubscription from "./hooks/useOrderSubscription";
import { COLORS, ORDER_STATUS } from "./libs/constants";
import { _getAllOrdersByStatus, _getAllTableIds } from "./graphql_operations/queries";
import { Context } from "./context/contextActions";

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
      setTimer(new Date(Date.now() - time).toISOString().substr(14, 5));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
              <ListItem key={Math.random()}>
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
let dbTableIds = [];

export default function BarApp() {
  const orders = useOrderSubscription();
  const { state, setAllTableIds } = useContext(Context);
  const [allOrders, setAllOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState({
    [ORDER_STATUS.CHOOSING]: [],
    [ORDER_STATUS.INLINE]: [],
    [ORDER_STATUS.IN_PROGRESS]: [],
  });
  const classes = useStyles();

  useEffect(() => {
    getAllTableIds({ eventId: state.event.id });
    return () => {
      console.log("cleanup");
    };
  }, []);

  useEffect(() => {
    let statuses = [ORDER_STATUS.CHOOSING, ORDER_STATUS.INLINE, ORDER_STATUS.IN_PROGRESS];

    for (const i in statuses) {
      getAllOrdersByStatus({ eventId: state.event.id, status: statuses[i] });
    }

    return () => {
      console.log("Clean up");
    };
  }, [orders]);

  if (allOrders.length > 0) groupOrderByTable(allOrders, state.tableIds);

  function groupOrderByTable(orders, tableIds) {
    for (var i = 0; i < tableIds.length; i++) {
      let tableId = tableIds[i];
      let table = orders.filter((t) => t.table.id === tableId).map((t) => t.table);
      console.log(table);
    }
  }

  async function getAllOrdersByStatus({ nT, eventId, status }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, status, nextToken } : { eventId, status };
    try {
      let { orders: fetchedOrders, nextToken: next } = await _getAllOrdersByStatus(params);

      if (fetchedOrders) dbOrders = dbOrders.concat(fetchedOrders);

      if (next) {
        await getAllOrdersByStatus({ nT: nextToken, eventId, status });
      } else {
        setAllOrders(_.uniqBy([...allOrders, ...dbOrders], "order.id"));
        return;
      }

      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function getAllTableIds({ nT, eventId }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, nextToken } : { eventId };
    try {
      let { tableIds: fetchedIds, nextToken: next } = await _getAllTableIds(params);

      if (fetchedIds) dbTableIds = dbTableIds.concat(fetchedIds);

      if (next) {
        await getAllTableIds({ nT: nextToken, eventId });
      } else {
        setAllTableIds(_.uniq(dbTableIds));
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
            {[1, 2, 3, 4, 5].map((o) => {
              return <GridCell key={Math.random()} />;
            })}
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            {[1, 2, 3, 4, 5].map((o) => {
              return <GridCell key={Math.random()} />;
            })}
          </Grid>
          <Grid item xs={4} spacing={1} container direction="column">
            {[1, 2, 3, 4, 5].map((o) => {
              return <GridCell key={Math.random()} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
