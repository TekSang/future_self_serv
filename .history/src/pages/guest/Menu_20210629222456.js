import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";

import { COLORS, ORDER_STATUS, PAGES, previewButtonType } from "../../libs/constants";
import MenuListDetails from "../../components/MenuListDetails";
import OrderPreview from "../../components/OrderPreview";
import { Context } from "../../context/contextActions";

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

export default function Menu() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();

  const {
    state: { products, localOrders, order, currentPage },
    setCurrentPage,
  } = useContext(Context);
  const [menu, setMenu] = useState(getMenu(products));

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (products) {
      setMenu(getMenu(products));
    }
  }, [products]);

  /*   useEffect(() => {
    if (order.status === ORDER_STATUS.INLINE && currentPage !== PAGES.home.path) {
      setCurrentPage(PAGES.home.path);
    }
  }, [order.status]); */

  function getMenu(products) {
    let categories = _.uniq(products.map((p) => p.category));
    return categories.map((category) => {
      return {
        category,
        id: category,
        products: products.filter((p) => p.category === category),
      };
    });
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
              <MenuListDetails categoryProducts={category.products} />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <OrderPreview type={previewButtonType.SEND} expanded={expanded} isLocalPreview={true} localOrders={localOrders} />
    </div>
  );
}
