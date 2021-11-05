import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { COLORS } from "../libs/constants";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    textAlign: "center",
    marginTop: 200,
    background: COLORS.white,
    boxShadow: "none",
  },
  title: {
    fontSize: 30,
    color: COLORS.redDark,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          Sorry, page not found!
        </Typography>
      </CardContent>
    </Card>
  );
}
