import React from "react";
import { Typography } from "@material-ui/core";

import Logo from "../logo.svg";

export default function WelcomeImage({ title, size }) {
  return (
    <>
      <img src={Logo} width={size} alt="company logo" />
      <Typography variant="h4">{title}</Typography>
    </>
  );
}
