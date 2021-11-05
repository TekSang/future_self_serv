import React, { useContext } from "react";

import { previewButtonType } from "../libs/constants";
import Carousel from "../components/Carousel";
import OrderPreview from "../components/OrderPreview";
import { Context } from "../context/contextActions";
import { Typography, Paper } from "@material-ui/core";

export default function Home() {
  const {
    state: { table },
  } = useContext(Context);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {table.message && (
        <Paper>
          {" "}
          <Typography style={{ margin: 1, fontWeight: 13 }}>{table.message}</Typography>
        </Paper>
      )}
      <Carousel />
      <OrderPreview type={previewButtonType.EDIT} />
    </div>
  );
}
