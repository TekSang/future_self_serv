import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { List, ListItem, ListItemText } from "@material-ui/core";
import _ from "lodash";

import { capitalizeEveryFirstLetter, COLORS } from "../libs/constants";
import { _getSchedule } from "../graphql_operations/queries";
import { Context } from "../context/contextActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: COLORS.black,
  },
}));

export default function EventTimeline() {
  const classes = useStyles();
  const [schedule, setSchedule] = useState([]);
  const {
    state: { event },
  } = useContext(Context);

  useEffect(() => {
    getSchedule(event.id);
  }, []);

  async function getSchedule(eventId) {
    try {
      let schedule = await _getSchedule({ eventId });
      if (schedule) {
        let mySchedule = schedule.contents.map((x) => {
          if (typeof x === "string") {
            return JSON.parse(x);
          } else {
            return x;
          }
        });
        setSchedule(_.sortBy(mySchedule, "time"));
      }
    } catch (error) {
      console.log("🚀 ~ file: EditSchedule.js ~ line 18 ~ getSchedule ~ error", error);
    }
  }

  return (
    <>
      <List
        dense={true}
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
          boxShadow: "none",
          maxWidth: "100%",
        }}
      >
        {schedule.map((item, i) => {
          return (
            <ListItem
              key={i}
              style={{
                margin: 5,
                width: "100%",
                backgroundColor: COLORS.orange,
                color: COLORS.white,
              }}
            >
              <Typography variant="inherit" style={{ width: 75, fontSize: 14, fontWeight: "bold" }}>
                {moment(item.time).format("LT")}
              </Typography>

              <ListItemText style={{ textAlign: "left" }}>
                <Typography variant="inherit" style={{ fontSize: 14 }}>
                  {capitalizeEveryFirstLetter(item.event)}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
