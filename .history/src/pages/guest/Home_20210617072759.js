import React from "react";

import { previewButtonType } from "../../libs/constants";
import Carousel from "../../components/Carousel";
import OrderPreview from "../../components/OrderPreview";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Carousel />
      <OrderPreview type={previewButtonType.EDIT} />
    </div>
  );
}
