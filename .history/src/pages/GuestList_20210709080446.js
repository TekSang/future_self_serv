import React, { useState, useEffect, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList as List } from "react-window";
import useWindowSize from "../hooks/useWindowSize";
import _ from "lodash";
import { COLORS } from "../libs/constants";
import WelcomeImage from "../components/WelcomeImage";
import { Context } from "../context/contextActions";

//import { guests } from "../../mocks/guestList";

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: theme.spacing(5),
    width: "100%",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

const sortByTable = (guests) => {
  let tables = _.uniqBy(
    guests.map((g) => g.table),
    "id"
  );
  return tables.map((table) => ({
    ...table,
    guests: guests.filter((guest) => guest.table.id === table.id).map((guest) => guest.user),
  }));
};

export default function GuestList({ guests, loginFunctionality, setIsUserLoggedIn }) {
  const classes = useStyles();
  const { width } = useWindowSize();
  const [guestList, setGuestList] = useState(guests);
  const [sortedByTable, setSortedByTable] = useState(sortByTable(guests));
  const [editing, setEditing] = useState(false);

  const { setUser, setTable } = useContext(Context);

  useEffect(() => {
    let allSorted = sortByTable(guests);
    let tableIds = _.uniq(guestList.map((g) => g.table.id));
    console.log(tableIds);
    /*  console.log(allSorted.filter()); */

    setSortedByTable(sortByTable(guestList));
  }, [guestList]);

  useEffect(() => {
    setGuestList(guests);
  }, [guests]);

  // console.log(sortedByTable);

  const renderRow = ({ index, style }) => {
    let guest = guestList[index].user;
    let table = guestList[index].table;

    return (
      <ListItem
        button={loginFunctionality}
        onClick={() => {
          if (loginFunctionality) {
            setUser(guest);
            setTable(table);
            setIsUserLoggedIn(true);
          }
        }}
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? COLORS.porcelain : COLORS.white,
        }}
        key={index}
        className={classes.row}
      >
        <ListItemText>{guest ? `${guest.firstName} ${guest.lastName}` : null}</ListItemText>
        <ListItemText style={{ textAlign: "right" }}>{table ? table.name : null}</ListItemText>
      </ListItem>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {loginFunctionality && (
        <div>
          <h5>Our Day presents</h5>
          <WelcomeImage size={300} title={`Felicité & Mandela`} />
        </div>
      )}
      <div className={classes.search}>
        <InputBase
          placeholder={loginFunctionality ? "Your name..." : "Enter name, table..."}
          onChange={(e) => {
            if (e.target.value) {
              setEditing(true);
            } else {
              setEditing(false);
            }
            let filtered = [
              ..._.filter(guests, (o) => {
                if (
                  o.user.firstName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ||
                  o.user.lastName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
                )
                  return o;
              }),
              ..._.filter(guests, (o) => {
                if (o.table.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) return o;
              }),
            ];

            filtered = _.without(filtered, undefined);
            filtered = _.uniq(filtered, "user.id");

            setGuestList(filtered);
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      {loginFunctionality ? (
        editing ? (
          guestList.length > 0 ? (
            <List
              height={width < 600 ? width * 0.9 : 600}
              width={width < 600 ? width * 0.9 : 600}
              style={{ marginTop: 50 }}
              itemSize={40}
              itemCount={guestList.length}
            >
              {renderRow}
            </List>
          ) : (
            <p>No results</p>
          )
        ) : null
      ) : (
        <List
          height={width < 600 ? width * 0.9 : 600}
          width={width < 600 ? width * 0.9 : 600}
          style={{ marginTop: 50 }}
          itemSize={40}
          itemCount={guestList.length}
        >
          {renderRow}
        </List>
      )}
    </div>
  );
}
