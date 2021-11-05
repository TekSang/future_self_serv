import React, { useContext } from "react";

import { previewButtonType, COLORS } from "../libs/constants";
import Carousel from "../components/Carousel";
import OrderPreview from "../components/OrderPreview";
import { Context } from "../context/contextActions";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: COLORS.greenLight,
    color: COLORS.white,
    borderRadius: "none",
  },
}));

export default function Home() {
  const classes = useStyles();
  const {
    state: { table },
  } = useContext(Context);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {table.message && (
        <Paper className={classes.paper}>
          <Typography style={{ margin: 1, fontWeight: 13 }}>{table.message}</Typography>
        </Paper>
      )}
      <Carousel />
      <OrderPreview type={previewButtonType.EDIT} />
    </div>
  );
}