import React, { useContext, useState, useEffect } from "react";
import { ListItemText, ListItem, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { capitalizeEveryFirstLetter, COLORS } from "../libs/constants";
import { Context } from "../context/contextActions";
import useWindowSize from "../hooks/useWindowSize";
import { _getAllProducts } from "../graphql_operations/queries";

const useStyles = makeStyles((theme) => ({
  preview: {
    width: "100%",
    overflow: "auto",
    marginTop: 20,
    marginBottom: 20,
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
    state: { products: globalProducts, localOrders, event },
  } = useContext(Context);
  const classes = useStyles();

  const [products, setProducts] = useState(globalProducts);

  useEffect(() => {
    getAllProducts({ eventId: event.id });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getAllProducts({ eventId }) {
    try {
      let { products: dbProducts } = await _getAllProducts({ eventId });

      setProducts(_.uniqBy(dbProducts, "id"));
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <>
      <List dense={true} component="nav" aria-label="list items" className={classes.preview} style={{ maxHeight: 200 }}>
        {localOrders.map((o) => {
          const item = products.filter((p) => p.id === o.id)[0];

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
}
