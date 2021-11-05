import React from "react";
import { Typography } from "@material-ui/core";

import Logo from "../logo.svg";

export default function WelcomeImage({ title, size }) {
  return (
    <>
      <img src={Logo} height={size} width={size} alt="company log" />
      <Typography variant="h6">{title}</Typography>
    </>
  );
}
