import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function SignUp() {
  const displayDesktop = () => {
    return <Toolbar>{covidHelp}</Toolbar>;
  };

  const covidHelp = (
    <Typography variant="h6" component="h1">
      Covid Help
    </Typography>
  );
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}

export default SignUp;
