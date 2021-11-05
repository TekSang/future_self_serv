import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { capitalizeEveryFirstLetter, COLORS, ORDER_ACTIONS, ORDER_STATUS } from "../libs/constants";
import { Context } from "../context/contextActions";
import { _updateOrder } from "../graphql_operations/mutations";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: COLORS.black,
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
}));

const completedThreshold = 180; // seconds, 3 mins

export default function GridCell({ table, status }) {
  const classes = useStyles();
  const initTime = new Date(_.min(table.map((t) => t.order.created))).getTime();
  const [time, setTimer] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);
  const [products, setProducts] = useState([]);
  const { state } = useContext(Context);
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
      }, 3000);
    }
  }, [displayMessage]);

  useEffect(() => {
    if ([ORDER_STATUS.IN_PROGRESS, ORDER_ACTIONS.INLINE]) {
      setCompletedCounter(completedCounter + 1);
    }
  }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setProducts(restructureProducts(table));
  }, [table]);

  function restructureProducts(orders) {
    let restructured = [];
    let allProducts = _.flatten(orders.map((p) => p.products));
    allProducts = allProducts.filter((p) => p !== null && p !== undefined);
    allProducts = allProducts.map((p) => ({ ...p.product, quantity: p.quantity }));
    allProducts.forEach((element) => {
      let product = restructured.filter((p) => element.id === p.id)[0];
      if (product) {
        restructured = restructured.map((p) => {
          p.quantity = p.quantity + element.quantity;
          return p;
        });
      } else {
        restructured = [...restructured, element];
      }
    });

    return restructured;
  }

  return (
    <Grid item>
      <Paper
        className={classes.paper}
        onClick={() => {
          switch (status) {
            case ORDER_STATUS.CHOOSING:
              setDisplayMessage(true);
              break;
            default:
              break;
          }
        }}
        style={{
          overflow: "auto",
          border:
            status === ORDER_STATUS.INLINE
              ? completedCounter > completedThreshold
                ? completedCounter % 2 === 0
                  ? `10px solid ${COLORS.redLight}`
                  : `10px solid ${COLORS.yellowLight}`
                : `1px solid ${COLORS.redLight}`
              : status === ORDER_STATUS.CHOOSING
              ? `1px solid ${COLORS.yellowLight}`
              : completedCounter > completedThreshold
              ? completedCounter % 2 === 0
                ? `10px solid ${COLORS.redLight}`
                : `10px solid ${COLORS.greenLight}`
              : `1px solid ${COLORS.greenLight}`,
        }}
      >
        {displayMessage ? (
          <Typography variant="body1" style={{ padding: 30, fontWeight: "bold", color: COLORS.red }}>
            Wait for order to switch to <span style={{ color: COLORS.redLight }}>INLINE</span>
          </Typography>
        ) : (
          <>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {table[0].table.name} <span style={{ color: COLORS.redLight }}> {time === 0 ? "" : time}</span>
            </Typography>
            <List dense={true}>
              {products.map((item) => {
                return (
                  <ListItem key={item.id}>
                    <ListItemText primary={capitalizeEveryFirstLetter(item.name)} />
                    <ListItemText style={{ textAlign: "end" }} primary={item.quantity} />
                  </ListItem>
                );
              })}
            </List>
            {status === ORDER_STATUS.INLINE && (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  for (const x in table) {
                    let order = table[x];
                    updateOrder({
                      eventId: state.event.id,
                      id: order.order.id,
                      tableId: order.table.id,
                      status: ORDER_STATUS.IN_PROGRESS,
                    });
                  }
                }}
              >
                PREPARE
              </Button>
            )}
            {status === ORDER_STATUS.IN_PROGRESS && (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  setCompletedCounter(0);
                  for (const x in table) {
                    let order = table[x];
                    updateOrder({
                      eventId: state.event.id,
                      id: order.order.id,
                      tableId: order.table.id,
                      status: ORDER_STATUS.COMPLETED,
                      fulfilledAt: new Date().toJSON(),
                    });
                  }
                }}
              >
                COMPLETED
              </Button>
            )}
          </>
        )}
      </Paper>
    </Grid>
  );
}
