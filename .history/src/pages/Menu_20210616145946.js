import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import MenuListDetails from "../components/MenuListDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";

import { COLORS, previewButtonType } from "../libs/constants";

//import { menu } from "../mocks/menu";
import OrderPreview from "../components/OrderPreview";
import { _getAllProducts } from "../graphql_operations/queries";
import { Context } from "../context/contextActions";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .3)",
    marginTop: 5,
    boxShadow: "none",
    "&:not(:last-child)": {},
    "&:before": {
      display: "none",
    },
    "&$expanded": {},
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(0, 0, 0, .3)",
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: { backgroundColor: COLORS.orange, color: COLORS.white },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: COLORS.white,
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  accordion: { width: "100%" },
}));

let dbProducts = [];

export default function Menu() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const {
    state: { products, event },
    setProducts,
  } = useContext(Context);
  const [menu, setMenu] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    getAllProducts({ eventId: event.id });
  }, []);

  useEffect(() => {
    if (products) {
      let categories = _.uniq(products.map((p) => p.category));
      let dbMenu = categories.map((category) => {
        return {
          category,
          id: category,
          items: products.filter((p) => p.category === category),
        };
      });

      setMenu(dbMenu);
    }
  }, [products]);

  async function getAllProducts({ nT, eventId }) {
    let nextToken = nT;

    let params = nextToken ? { eventId, nextToken } : { eventId };
    try {
      let { products: fetchedProducts, nextToken: next } = await _getAllProducts(params);

      if (fetchedProducts) dbProducts = dbProducts.concat(fetchedProducts);

      if (next) {
        await getAllProducts({ nT: nextToken, eventId });
      } else {
        dbProducts = _.uniqBy(dbProducts, "id");
        setProducts(dbProducts);
        return;
      }
      //console.log(dbProducts);
      nextToken = next;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {menu.map((category) => {
        return (
          <Accordion
            className={classes.accordion}
            key={category.id}
            square
            expanded={expanded === category.id}
            onChange={handleChange(category.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MenuListDetails categoryItems={category.items} />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <OrderPreview type={previewButtonType.SEND} expanded={expanded} />
    </div>
  );
}
