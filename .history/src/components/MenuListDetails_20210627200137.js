import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Context } from "../context/contextActions";
import { COLORS, ORDER_STATUS, capitalizeEveryFirstLetter } from "../libs/constants";
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
    state: { order, localOrders },
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
