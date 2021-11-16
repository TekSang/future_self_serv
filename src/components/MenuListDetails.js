import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Grid, GridList, GridListTile } from "@material-ui/core";
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

  //+1
  const addOrder = (id) => {
    let localOrder = localOrders.filter((op) => op.id === id)[0];
    let update = [];
    if (localOrder) {
      update = localOrders.map((lop) => {
        if (lop.id === id) {
          lop.quantity = Math.min(lop.quantity + 1, 20);
        }
        return lop;
      });
    } else {
      let newProduct = {
        id,
        quantity: 1,
      };
      update = [...localOrders, newProduct];
    }

    setLocalOrders(update.filter((item) => item.quantity > 0));
  };

  //-1 
  const removeOrder = (id) => {
    let localOrder = localOrders.filter((op) => op.id === id)[0];
    console.log("🚀 ~ file: MenuListDetails.js ~ line 71 ~ removeOrder ~ order", order);
    let update = [];
    if (localOrder) {
      update = localOrders.map((lop) => {
        if (lop.id === id) {
          lop.quantity = Math.max(lop.quantity - 1, 0);
        }
        return lop;
      });
      let validOrders = update.filter((item) => item.quantity > 0);
      setLocalOrders(validOrders);
    }
  };

  //list of products
  return (
    <div className={classes.root}>
      <GridList   dense={true}  className={classes.item}>
        {categoryProducts &&
          categoryProducts.map((product, i) => {
            let localOrder = localOrders.filter((lop) => lop.id === product.id)[0];
            return (
              // <ListItem key={product.id}>
              //   <ListItemText primary={capitalizeEveryFirstLetter(product.name)} />
              //   <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              //     {order.status !== ORDER_STATUS.IN_PROGRESS ? (
              //       <>
              //         <IconButton
              //           aria-label="subtract"
              //           onClick={() => {
              //             removeOrder(product.id);
              //           }}
              //         >
              //           <RemoveIcon style={{ color: COLORS.black, fontSize: 30 }} />
              //         </IconButton>
              //         <ListItemText style={{ fontWeight: "bold" }} primary={localOrder ? localOrder.quantity : 0} />
              //         <IconButton
              //           aria-label="add"
              //           onClick={() => {
              //             addOrder(product.id);
              //           }}
              //         >
              //           <AddIcon style={{ color: COLORS.black, fontSize: 30 }} />
              //         </IconButton>
              //       </>
              //     ) : (
              //       <ListItemText primary="Votre Commande est un route..." />
              //     )}
              //   </div>
              // </ListItem>
              <GridListTile  style={{ fontWeight: "bold" }} item className="article" onClick={() => {
                            addOrder(product.id);
                          }} >
              <article key={product.id} className="menu-item">
              {/* <img src={require(`../picturesMenu/${product.name}.jpg}`)} alt={product.name} className="photo" /> */}
              {/* <div className="item-info"> */}
                <header>
                  <h4>{product.name}</h4>
                  <h4 className="price">4€</h4>
                </header>
                <text style={{float:"right" }}>
                  {localOrder ? localOrder.quantity : 0}
                </text>
              {/* </div> */}
            </article>
            </GridListTile >
            
            );
          })}
      </GridList >
    </div>
  );
}
