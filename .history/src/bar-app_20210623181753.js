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
import { _getAllOrdersByStatus } from "./graphql_operations/queries";
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

function Column({ orders }) {
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
    <Grid item xs={4} spacing={1} container direction="column">
      {Object.keys(groupedByTable).map((o) => {
        return <GridCell key={o} table={groupedByTable[o]} />;
      })}
    </Grid>
  );
}

function GridCell({ table, index }) {
  const classes = useStyles();
  const initTime = new Date(_.min(table.map((t) => t.order.created))).getTime();
  const [time, setTimer] = useState(0);
  const [products, setProducts] = useState([]);

  // console.log(table);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date(Date.now() - initTime).toISOString().substr(11, 8));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let updated = _.unionBy(_.flatten([...table.map((t) => [...t.products])]), function (p) {
      return p.product.id;
    });
    console.log(updated);
    setProducts(updated);
  }, [table]);

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
          {table[0].table.name} <span style={{ color: COLORS.redLight }}> {time}</span>
        </Typography>
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
      </Paper>
    </Grid>
  );
}

export default function BarApp() {
  useOrderSubscription();
  const { state, setBarOrders } = useContext(Context);
  const [sortedOrders, setSortedOrders] = useState({
    [ORDER_STATUS.CHOOSING]: [],
    [ORDER_STATUS.INLINE]: [],
    [ORDER_STATUS.IN_PROGRESS]: [],
  });
  const classes = useStyles();

  useEffect(() => {
    if (state.barOrders.length > 0) {
      let grouped = _.groupBy(state.barOrders, function (order) {
        return order.table.status;
      });
      setSortedOrders({ ...grouped });
      console.log(grouped);
    }
  }, [state.barOrders]);

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
          <Column orders={sortedOrders[ORDER_STATUS.INLINE]} />
          <Column orders={sortedOrders[ORDER_STATUS.CHOOSING]} />
          <Column orders={sortedOrders[ORDER_STATUS.IN_PROGRESS]} />
        </Grid>
      </Grid>
    </div>
  );
}
