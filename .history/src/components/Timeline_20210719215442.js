import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
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
          maxWidth: "50vw",
        }}
      >
        {schedule.map((item, i) => {
          return (
            <ListItem key={i} style={{ backgroundColor: "red", margin: 5, width: "100%" }}>
              <Typography
                variant="inherit"
                style={{ backgroundColor: "yellow", width: 60, fontSize: 14, fontWeight: "bold" }}
              >
                {moment(item.time).format("LT")}
              </Typography>

              <ListItemText style={{ textAlign: "left", backgroundColor: "green" }}>
                <Typography variant="inherit" style={{ fontSize: 14 }}>
                  {capitalizeEveryFirstLetter(item.event)}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      {/*       <Timeline style={{ overflow: "auto", border: "none" }}>
        {schedule.map((item, i) => {
          return (
            <TimelineItem key={i}>
              <TimelineOppositeContent>
                <Typography color="textPrimary">{moment(item.time).format("LT")}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                {i < schedule.length - 1 && <TimelineConnector className={classes.secondaryTail} />}
              </TimelineSeparator>
              <TimelineContent
                style={{
                  backgroundColor: COLORS.orange,
                  color: COLORS.white,
                  marginBottom: 10,
                  marginLeft: 10,
                  borderRadius: 5,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography>{capitalizeEveryFirstLetter(item.event)}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline> */}
    </>
  );
}
