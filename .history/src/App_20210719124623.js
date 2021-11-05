// External dependencies
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFullScreen } from "react-browser-hooks";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase, Button, Modal, Paper } from "@material-ui/core";
// Libs, state and graphql operations
import { Context } from "./context/contextActions";
import useEventListener from "./hooks/useEventListener";

// Components
import GuestApp from "./guest-app";
import WelcomeImage from "./components/WelcomeImage";
import { coupleName, COLORS, PAGES, hasExpired } from "./libs/constants";
import { _getEventByCode } from "./graphql_operations/queries";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontWeight: "bolder",
    margin: theme.spacing(3),
    border: "none",
    "&:hover": {
      backgroundColor: COLORS.white,
      color: COLORS.orange,
      border: "1px solid " + COLORS.orange,
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
    setCurrentPage,
    setEvent,
  } = useContext(Context);

  const classes = useStyles();
  // Local state
  const { toggle, fullScreen } = useFullScreen();
  const [eventCode, setEventCode] = useState("");
  const [error, setError] = useState({ error: false, message: "" });

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
      <Modal
        className={classes.modal}
        open={error.error}
        onClose={() => {
          setError({ error: false, message: "" });
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>{error.message}</Paper>
      </Modal>
      <h5>Our Day presents</h5>
      <WelcomeImage size={300} title={coupleName} />

      <div className={classes.search}>
        <InputBase
          placeholder="Event Code..."
          onChange={(e) => {
            console.log(e.target.value);
            setEventCode(e.target.value);
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
        onClick={async () => {
          try {
            await getEventByCode(eventCode);
          } catch (error) {
            setError({ error: true, message: "Failed getting event" });
            console.log(error);
          }
        }}
      >
        Submit
      </Button>
    </div>
  );

  useEffect(() => {
    setBarOrders([]);

    /*     if (hasExpired) {
      setEvent({});
    } */

    if (process.env.NODE_ENV.includes("dev")) {
      getEventByCode("f&m");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getEventByCode(eventCode) {
    try {
      let event = await _getEventByCode({ code: eventCode });
      if (event) {
        setEvent(event);
        setCurrentPage(PAGES.home.path);
      } else {
        setError({ error: true, message: "No Event with the given code exists, please verify your code" });
        setEvent({});
      }
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 181 ~ getEventByCode ~ error", error);
    }
  }

  return event.id ? <GuestApp /> : setupEvent;
}

export default App;
