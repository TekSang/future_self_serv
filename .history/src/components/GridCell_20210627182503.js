import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { capitalizeEveryFirstLetter, COLORS, ORDER_STATUS } from "../libs/constants";
import { Context } from "../context/contextActions";
import { _updateOrder } from "../graphql_operations/mutations";
import { _getOrdersOnTable } from "../graphql_operations/queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: COLORS.black,
  },
}));

export default function GridCell({ table, status }) {
  const classes = useStyles();
  const initTime = new Date(_.min(table.map((t) => t.order.created))).getTime();
  const [time, setTimer] = useState(0);
  const [products, setProducts] = useState([]);
  const [isMouseOnPaper, setMouseOnPaper] = useState(false);
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


  }

  useEffect(() => {
    if (displayMessage) {
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    }
  }, [displayMessage]);


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
                console.log(order.order.id);
                updateOrder({
                  eventId: state.event.id,
                  id: order.order.id,
                  tableId: order.table.id,
                  status: ORDER_STATUS.IN_PROGRESS,
                });
              }
              break;
            case ORDER_STATUS.CHOOSING:
              //setDisplayMessage(true);
              for (const x in table) {
                let order = table[x];
                updateOrder({
                  eventId: state.event.id,
                  id: order.order.id,
                  tableId: order.table.id,
                  status: ORDER_STATUS.INLINE,
                });
              }
              break;
            case ORDER_STATUS.IN_PROGRESS:
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
              break;
            default:
              break;
          }
        }}
        style={{
          overflow: "auto",
          border: `1px solid ${
            status === ORDER_STATUS.INLINE
              ? COLORS.redLight
              : status === ORDER_STATUS.CHOOSING
              ? COLORS.yellowLight
              : COLORS.greenDark
          }`,
        }}
      >
        {displayMessage ? (
          <Typography variant="body1" style={{ padding: 30, fontWeight: "bold", color: COLORS.red }}>
            Wait for order to switch to <span style={{ color: COLORS.redLight }}>INLINE</span>
          </Typography>
        ) : (
          <>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {table[0].table.name} <span style={{ color: COLORS.redLight }}> {time}</span>
            </Typography>
            <List dense={true}>
              {products.map((item) => {
                return (
                  <ListItem key={item.product.id}>
                    <ListItemText primary={capitalizeEveryFirstLetter(item.product.name)} />
                    <ListItemText style={{ textAlign: "end" }} primary={item.product.quantity} />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Paper>
    </Grid>
  );
}
