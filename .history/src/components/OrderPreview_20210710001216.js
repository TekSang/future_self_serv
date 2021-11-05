import React, { useContext } from "react";
import { ListItemText, ListItem, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { capitalizeEveryFirstLetter, COLORS } from "../libs/constants";
import { Context } from "../context/contextActions";
import useWindowSize from "../hooks/useWindowSize";

const useStyles = makeStyles((theme) => ({
  preview: {
    width: "100%",
    overflow: "auto",
    marginTop: 20,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontWeight: "bolder",
    fontSize: 20,
    width: 200,
    "&:hover": {
      backgroundColor: COLORS.white,
      color: COLORS.orange,
    },
  },
  card: { backgroundColor: COLORS.white, color: COLORS.orange },
}));

export default function OrderPreview({ expanded }) {
  const {
    state: { products, localOrders },
  } = useContext(Context);
  const { width, height } = useWindowSize();
  const classes = useStyles();

  return (
    <>
      <List
        dense={true}
        component="nav"
        aria-label="list items"
        className={classes.preview}
        style={localOrders.length > 0 ? { height: width < 800 ? (expanded ? height * 0.2 : height * 0.5) : 700 } : {}}
      >
        {localOrders.map((o) => {
          const item = products.filter((p) => p.id === o.id)[0];
          console.log(o);
          if (item) {
            return (
              <ListItem key={o.id} style={{ padding: 0 }}>
                <ListItemText primary={capitalizeEveryFirstLetter(item.name)} />
                <ListItemText style={{ textAlign: "right", fontWeight: "bold" }}>{o.quantity}</ListItemText>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </List>
    </>
  );
  /* ) : (
    <>
      <List
        dense={true}
        component="nav"
        aria-label="list items"
        className={classes.preview}
        style={
          order.products.length > 0 ? { height: width < 800 ? (expanded ? height * 0.2 : height * 0.5) : 700 } : {}
        }
      >
        {order.products.map((o) => {
          return (
            <ListItem key={o.id + o.id} style={{ padding: 0 }}>
              <ListItemText primary={o.name} />
              <ListItemText style={{ textAlign: "right", fontWeight: "bold" }}>{o.quantity}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  ); */
}
