// External dependencies
import React, { useContext, useEffect, useCallback } from "react";
import { useFullScreen } from "react-browser-hooks";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase, Button } from "@material-ui/core";
// Libs, state and graphql operations
import { Context } from "./context/contextActions";
import useEventListener from "./hooks/useEventListener";

// Components
import GuestApp from "./guest-app";
import WelcomeImage from "./components/WelcomeImage";
import { coupleName, COLORS } from "./libs/constants";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontWeight: "bolder",
    border: "none",
    "&:hover": {
      backgroundColor: COLORS.white,
      color: COLORS.orange,
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  row: {
    padding: 20,
  },
}));

function App(props) {
  // Global state
  const {
    state: { event },
    setBarOrders,
  } = useContext(Context);

  const classes = useStyles();
  // Local state
  const { toggle, fullScreen } = useFullScreen();

  // hooks
  useEventListener(
    "click",
    useCallback(
      // Event handler utilizing useCallback ...
      // ... so that reference never changes.
      (event) => {
        if (!fullScreen && !process.env.NODE_ENV.includes("dev")) {
          toggle();
        }
      },
      [toggle, fullScreen]
    )
  );

  const setupEvent = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h5>Our Day presents</h5>
      <WelcomeImage size={300} title={coupleName} />

      <div className={classes.search}>
        <InputBase
          placeholder="Enter Event code..."
          onChange={(e) => {
            console.log(e.target.value);
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => {
          console.log("Verify and get event code");
        }}
      >
        Submit
      </Button>
    </div>
  );

  useEffect(() => {
    setBarOrders([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return event.id ? <GuestApp /> : setupEvent;
}

export default App;
