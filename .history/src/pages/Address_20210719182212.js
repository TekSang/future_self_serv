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
        <Typography variant="h6" component="h2">
          <strong>Eglise:</strong> "Church address"
        </Typography>
        <Typography variant="h6" component="h2">
          <strong>Reception:</strong> {"moment(state.event.dateOfEvent).format()"}
        </Typography>
      </CardContent>
    </Card>
  );
}
