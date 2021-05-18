import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Header() {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="h1">
          Femmecubator
        </Typography>
      </Toolbar>
    </div>
  );
}

export default Header;
