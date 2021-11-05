import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import _ from "lodash";

import GridCell from "./components/GridCell";

export default function Column({ orders, status }) {
  const [groupedByTable, setGroupedByTable] = useState(
    _.groupBy(orders, function (order) {
      return order.table.id;
    })
  );

  useEffect(() => {
    setGroupedByTable(
      _.groupBy(orders, function (order) {
        return order.table.id;
      })
    );
  }, [orders]);

  return (
    <Grid item xs={4} spacing={1} container direction="column" style={{ overflowY: "auto" }}>
      {Object.keys(groupedByTable).map((o) => {
        return <GridCell key={o} table={groupedByTable[o]} status={status} />;
      })}
    </Grid>
  );
}
