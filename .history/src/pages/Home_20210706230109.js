import React, { useContext } from "react";

import { previewButtonType } from "../libs/constants";
import Carousel from "../components/Carousel";
import OrderPreview from "../components/OrderPreview";
import { Context } from "../context/contextActions";
import { Typography } from "@material-ui/core";

export default function Home() {
  const {
    state: { table },
  } = useContext(Context);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {table.message && <Typography>{table.message}</Typography>}
      <Carousel />
      <OrderPreview type={previewButtonType.EDIT} />
    </div>
  );
}
