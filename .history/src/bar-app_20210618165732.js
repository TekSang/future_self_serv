import React from "react";
import { InputBase, Toolbar, CssBaseline, AppBar, Paper, Grid } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

import useOrderSubscription from "./hooks/useOrderSubscription";
import { COLORS } from "./libs/constants";

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
    },
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  grid: {
    marginTop: 100,
    backgroundColor: COLORS.white,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function BarApp() {
  const orders = useOrderSubscription();
  const classes = useStyles();
  console.log(orders);
  function GridRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item 1</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item 2</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item 3</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <InputBase
              placeholder="table name..."
              onChange={(e) => {
                console.log("search", e.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1} className={classes.grid}>
        <Grid container item xs={12} spacing={3}>
          <GridRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <GridRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <GridRow />
        </Grid>
      </Grid>
    </div>
  );
}
