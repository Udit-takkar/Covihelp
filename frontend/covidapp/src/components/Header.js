import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import UserServiceApi from "../api/UserServiceApi";
import uuid from "react-uuid";
import { headersData, LoggedInHeader, staffHeader } from "../util/HeaderItems";

const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
    boxShadow: "none",
    paddingRight: "79px",
    color: "rgb(0,51,102)",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "rgb(0,51,102)",
    fontSize: "25px",
    position: "relative",
    left: "55px",
  },
  toolbar: {
    display: "flex",
    width: "100vw",
    justifyContent: "space-between",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
});

function Header() {
  const classes = useStyles();
  //   const isUserLoggedIn = UserServiceApi.isUserLoggedIn();
  //   const isUserStaff = UserServiceApi.isUserStaff();
  const isUserLoggedIn = false;
  const isUserStaff = false;
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {covidHelp}
        <div>
          {!isUserLoggedIn && getMenuButtons(headersData)}
          {isUserLoggedIn && (
            <>
              {isUserStaff
                ? getMenuButtons(staffHeader)
                : getMenuButtons(LoggedInHeader)}
            </>
          )}
        </div>
      </Toolbar>
    );
  };
  const covidHelp = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Covid Help
    </Typography>
  );

  const getMenuButtons = (menuItems) => {
    return menuItems.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  return (
    <header>
      <AppBar className={classes.header}>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Header;
