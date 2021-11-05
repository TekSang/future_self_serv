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
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    border: "none",
    boxShadow: "none",
    backgroundColor: COLORS.white,
    width: "80%",
  },
}));

export default function Address() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        style={{
          width: "100%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: COLORS.orange,
          margin: 15,
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
          Eglise:
        </Typography>
        <Typography variant="body2">
          <strong>Christus Koning</strong>
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

          backgroundColor: COLORS.orange,
          margin: 15,
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
          Photos:
        </Typography>
        <Typography variant="body2">
          <strong>Kasteel Den Brandt</strong>
          <a href="https://goo.gl/maps/DxoLmxHDPhgYbX8c6">Beukenlaan 12, 2020 Antwerpen</a>
        </Typography>
      </div>

      <div
        style={{
          width: "100%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: COLORS.orange,
          margin: 15,
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Typography variant="button" style={{ fontWeight: "bold", marginRight: 20 }}>
          Reception:
        </Typography>
        <Typography variant="body2">
          <p style={{ fontWeight: "bold" }}>Kasteeldomein Hof Ter Laken</p>
          <a href="https://goo.gl/maps/hUwi2ZVVWpNNVPQb8">Hofdreef 2, 2221 Heist-op-den-Berg</a>
        </Typography>
      </div>
    </div>
  );
}
