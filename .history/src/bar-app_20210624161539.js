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
import { capitalizeEveryFirstLetter, COLORS, ORDER_STATUS } from "./libs/constants";
import { Context } from "./context/contextActions";
import { getSortedOrders } from "./libs/functions";
import { _getAllOrdersByStatus } from "./graphql_operations/queries";
import { _updateOrder } from "./graphql_operations/mutations";

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Column({ orders, status }) {
  const [groupedByTable, setGroupedByTable] = useState(
    _.groupBy(orders, function (order) {
      return order.table.id;
    })
  );

  useEffect(() => {
    setGroupedByTable(
      _.groupBy(orders, function (order) {
        return order.table.id;
      })
    );
  }, [orders]);

  return (
    <Grid item xs={4} spacing={1} container direction="column" style={{ overflowY: "auto" }}>
      {Object.keys(groupedByTable).map((o) => {
        return <GridCell key={o} table={groupedByTable[o]} status={status} />;
      })}
    </Grid>
  );
}

function GridCell({ table, status }) {
  const classes = useStyles();
  const initTime = new Date(_.min(table.map((t) => t.order.created))).getTime();
  const [time, setTimer] = useState(0);
  const [products, setProducts] = useState([]);
  const [isMouseOnPaper, setMouseOnPaper] = useState(false);
  const { state, setBarOrders } = useContext(Context);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date(Date.now() - initTime).toISOString().substr(11, 8));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateOrder({ eventId, products, tableId, fulfilledAt, id, status }) {
    try {
      const dbOrder = await _updateOrder({ eventId, products, tableId, fulfilledAt, id, status });
      console.log(dbOrder);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (displayMessage) {
      setTimeout(() => {
        setDisplayMessage(false);
      }, 1000);
    }
  }, [displayMessage]);

  useEffect(() => {
    let updated = _.uniqBy(
      _.flatten([
        ...table.map((t) => {
          return t.products ? [...t.products] : [];
        }),
      ]),
      function (p) {
        return p.product.id;
      }
    );
    setProducts(updated);
  }, [table]);

  return (
    <Grid item>
      <Paper
        className={classes.paper}
        onMouseEnter={() => {
          setMouseOnPaper(true);
        }}
        onMouseLeave={() => {
          setMouseOnPaper(false);
        }}
        onClick={() => {
          switch (status) {
            case ORDER_STATUS.INLINE:
              for (const x in table) {
                let order = table[x];
                updateOrder({
                  eventId: state.event.id,
                  id: order.order.id,
                  tableId: order.table.id,
                  status: ORDER_STATUS.IN_PROGRESS,
                });
              }
              break;
            case ORDER_STATUS.CHOOSING:
              for (const x in table) {
                let order = table[x];
                updateOrder({
                  eventId: state.event.id,
                  id: order.order.id,
                  tableId: order.table.id,
                  status: ORDER_STATUS.IN_PROGRESS,
                });
              }
              break;
            default:
              break;
          }
        }}
        style={{
          overflow: "auto",
          transform: isMouseOnPaper ? "scale(1.01)" : "scale(1)",
          border: `${isMouseOnPaper ? "3px" : "1px"} solid ${
            status === ORDER_STATUS.INLINE
              ? COLORS.redLight
              : status === ORDER_STATUS.CHOOSING
              ? COLORS.yellowLight
              : COLORS.greenDark
          }`,
        }}
      >
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {table[0].table.name} <span style={{ color: COLORS.redLight }}> {time}</span>
        </Typography>
        {displayMessage ? (
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            {table[0].table.name} <span style={{ color: COLORS.redLight }}> {time}</span>
          </Typography>
        ) : (
          <List dense={true}>
            {products.map((item) => {
              return (
                <ListItem key={item.product.id}>
                  <ListItemText primary={capitalizeEveryFirstLetter(item.product.name)} />
                  <ListItemText style={{ textAlign: "end" }} primary={item.quantity} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
    </Grid>
  );
}

export default function BarApp() {
  useOrderSubscription();
  const classes = useStyles();
  const { state, setBarOrders } = useContext(Context);

  useEffect(() => {
    let statuses = [ORDER_STATUS.CHOOSING, ORDER_STATUS.INLINE, ORDER_STATUS.IN_PROGRESS];
    for (const i in statuses) {
      getAllOrdersByStatus({ eventId: state.event.id, status: statuses[i] });
    }
    return () => {
      console.log("Clean up");
    };
  }, []);

  useEffect(() => {}, [state.barOrders]);

  async function getAllOrdersByStatus({ nT, eventId, status }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, status, nextToken } : { eventId, status };
    try {
      let { orders: fetchedOrders, nextToken: next } = await _getAllOrdersByStatus(params);

      let fetchedIds = fetchedOrders.map((o) => o.order.id);

      if (fetchedOrders)
        setBarOrders([...state.barOrders.filter((o) => !fetchedIds.includes(o.order.id)), ...fetchedOrders]); // dbOrders = dbOrders.concat(fetchedOrders);

      if (next) {
        await getAllOrdersByStatus({ nT: nextToken, eventId, status });
      } else {
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
          alignItems="flex-start"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Column orders={getSortedOrders(state.barOrders)[ORDER_STATUS.INLINE]} status={ORDER_STATUS.INLINE} />
          <Column orders={getSortedOrders(state.barOrders)[ORDER_STATUS.CHOOSING]} status={ORDER_STATUS.CHOOSING} />
          <Column
            orders={getSortedOrders(state.barOrders)[ORDER_STATUS.IN_PROGRESS]}
            status={ORDER_STATUS.IN_PROGRESS}
          />
        </Grid>
      </Grid>
    </div>
  );
}
