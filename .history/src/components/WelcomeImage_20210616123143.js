import React from "react";
import { Typography } from "@material-ui/core";

import Logo from "../assets/images/logo.svg";

export default function Home({ title, size }) {
  return (
    <>
      <img src={Logo} height={size} width={size} alt="company log" />
      <Typography variant="h6">{title}</Typography>
    </>
  );
}
