import React, { useContext } from "react";

import { previewButtonType } from "../libs/constants";
import Carousel from "../components/Carousel";
import OrderPreview from "../components/OrderPreview";
import { Context } from "../context/contextActions";

export default function Home() {
  const {
    state: { event },
  } = useContext(Context);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Carousel />
      <OrderPreview type={previewButtonType.EDIT} />
    </div>
  );
}
