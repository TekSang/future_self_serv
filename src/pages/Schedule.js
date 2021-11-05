import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { COLORS } from "../libs/constants";
import Timeline from "../components/Timeline";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    "&:hover": {
      backgroundColor: COLORS.white,
      color: COLORS.orange,
    },
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .3)",
    marginTop: 5,
    boxShadow: "none",
    width: "100%",
    "&:not(:last-child)": {},
    "&:before": {
      display: "none",
    },
    "&$expanded": { border: "none" },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(0, 0, 0, .3)",
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: { backgroundColor: COLORS.orange, color: COLORS.white },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: COLORS.white,
  },
}))(MuiAccordionDetails);

export default function Home() {
  const [expanded, setExpanded] = useState(true);
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Accordion
        square
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
      >
        <AccordionSummary>
          <Typography variant="h6" className={classes.text} style={{ fontWeight: "bold", textAlign: "center" }}>
            Today's Schedule
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Timeline />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
