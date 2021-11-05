import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { _createOrder, _updateOrder } from "../graphql_operations/mutations";
import { Context } from "../context/contextActions";
import { COLORS, ORDER_STATUS, capitalizeEveryFirstLetter, defaultState } from "../libs/constants";
import useWindowSize from "../hooks/useWindowSize";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: COLORS.white,
  },
}));

export default function MenuListDetails({ categoryProducts }) {
  const classes = useStyles();
  const { height = 700 } = useWindowSize();

  const {
    state: { user, event, order, localOrders, table },
    setOrder,
    setLocalOrders,
  } = useContext(Context);

  const addOrder = (id) => {
    let localOrderProduct = localOrders.filter((op) => op.id === id)[0];
    let update = [];
    if (localOrderProduct) {
      update = localOrders.map((lop) => {
        if (lop.id === id) {
          lop.quantity = Math.min(lop.quantity + 1, 20);
        }
        return lop;
      });
    } else {
      update = [
        ...localOrders,
        {
          id,
          quantity: 1,
        },
      ];
    }

    setLocalOrders(update.filter((item) => item.quantity > 0));
  };
  const removeOrder = (id) => {
    let localOrderProduct = localOrders.filter((op) => op.id === id)[0];
    let update = [];
    if (localOrderProduct) {
      update = localOrders.map((lop) => {
        if (lop.id === id) {
          lop.quantity = Math.max(lop.quantity - 1, 0);
        }
        return lop;
      });
      setLocalOrders(update.filter((item) => item.quantity > 0));
    }
  };

  useEffect(() => {
    if (localOrders.length > 0) {
      if (order.id) {
        updateOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ productId: id, quantity })),
          tableId: table.id,
          id: order.id,
          status: ORDER_STATUS.CHOOSING,
        });
      } else {
        createOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ productId: id, quantity })),
          tableId: table.id,
          userId: user.id,
        });
      }
    } else {
      if (order.id) {
        if (order.products.length > 0) {
          updateOrder({
            eventId: event.id,
            products: order.products.map(({ id }) => ({ productId: id, quantity: 0 })),
            tableId: table.id,
            id: order.id,
            status: ORDER_STATUS.CANCELLED,
          });
        }
      }
      setOrder(defaultState.order);
    }
  }, [localOrders]); // eslint-disable-line react-hooks/exhaustive-deps

  async function createOrder({ eventId, products, tableId, userId }) {
    try {
      const dbOrder = await _createOrder({ eventId, products, tableId, userId });

      setOrder({
        ...dbOrder.order,
        products: dbOrder.products.map((p) => ({
          ...p.product,
          quantity: p.quantity,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateOrder({ eventId, products, tableId, fulfilledAt, id, status }) {
    try {
      const dbOrder = await _updateOrder({ eventId, products, tableId, fulfilledAt, id, status });
      setOrder({
        ...dbOrder.order,
        products: dbOrder.products.map((p) => ({
          ...p.product,
          quantity: p.quantity,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <List dense={true} style={{ overflow: "auto", maxHeight: height * 0.3 }} className={classes.item}>
        {categoryProducts &&
          categoryProducts.map((product, i) => {
            let localOrderProduct = localOrders.filter((lop) => lop.id === product.id)[0];
            return (
              <ListItem key={product.id}>
                <ListItemText primary={capitalizeEveryFirstLetter(product.name)} />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {order.status !== ORDER_STATUS.IN_PROGRESS ? (
                    <>
                      <IconButton
                        aria-label="subtract"
                        onClick={() => {
                          removeOrder(product.id);
                        }}
                      >
                        <RemoveIcon style={{ color: COLORS.black, fontSize: 30 }} />
                      </IconButton>
                      <ListItemText
                        style={{ fontWeight: "bold" }}
                        primary={localOrderProduct ? localOrderProduct.quantity : 0}
                      />
                      <IconButton
                        aria-label="add"
                        onClick={() => {
                          addOrder(product.id);
                        }}
                      >
                        <AddIcon style={{ color: COLORS.black, fontSize: 30 }} />
                      </IconButton>
                    </>
                  ) : (
                    <ListItemText primary="Your order is coming..." />
                  )}
                </div>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}
