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
    border: "none",
    boxShadow: "none",
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
        <div
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 0px 7px 0px #000000",
            margin: 15,
          }}
        >
          <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
            Eglise:
          </Typography>
          <Typography variant="body" s>
            <p style={{ fontWeight: "bold" }}>Christus Koning</p>
            <a href="https://goo.gl/maps/2gLpJCrNDuXGTBPp6">Louis Straussstraat 1, 2020 Antwerpen</a>
          </Typography>
        </div>
        <div
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 0px 7px 0px #000000",
            margin: 15,
          }}
        >
          <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
            Photos:
          </Typography>
          <Typography variant="body" s>
            <p style={{ fontWeight: "bold" }}>Christus Koning</p>
            <a href="https://goo.gl/maps/2gLpJCrNDuXGTBPp6">Louis Straussstraat 1, 2020 Antwerpen</a>
          </Typography>
        </div>{" "}
        <div
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 0px 7px 0px #000000",
            margin: 15,
          }}
        >
          <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
            Reception:
          </Typography>
          <Typography variant="body" s>
            <p style={{ fontWeight: "bold" }}>Kasteeldomein Hof Ter Laken</p>
            <a href="https://goo.gl/maps/hUwi2ZVVWpNNVPQb8">Hofdreef 2, 2221 Heist-op-den-Berg</a>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
