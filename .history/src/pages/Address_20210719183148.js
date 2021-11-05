import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent } from "@material-ui/core";
import { COLORS } from "../libs/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "50px",
    width: 300,
    fontWeight: "bold",
  },
  root: {
    marginTop: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default function Address() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent style={{ textAlign: "left" }}>
        <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}></div>
        <div>Church</div>
        <div>Reception</div>
      </CardContent>
    </Card>
  );
}
