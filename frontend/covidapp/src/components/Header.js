import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import UserServiceApi from "../api/UserServiceApi";
import uuid from "react-uuid";
import { headersData, LoggedInHeader, staffHeader } from "../util/HeaderItems";
import { logoutUser } from "../features/authentication/auth";
import { useDispatch } from "react-redux";
import { isUserLoggedIn, getUserType } from "../features/authentication/auth";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
    boxShadow: "none",
    paddingRight: "79px",
    color: "rgb(0,51,102)",
    width: "100vw",
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
  const dispatch = useDispatch();
  const checkLoggedIn = useSelector(isUserLoggedIn);
  const usertype = useSelector(getUserType);
  const isUserDriver = true; /////
  const handleLogout = async () => {
    localStorage.removeItem("token");
    await dispatch(logoutUser());
  };
  //   const isUserLoggedIn = UserServiceApi.isUserLoggedIn();
  //   const isUserStaff = UserServiceApi.isUserStaff();
  const isLoggedIn = checkLoggedIn;
  const isUserStaff = usertype === "Admin" ? true : false;
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {covidHelp}
        <div>
          {!isLoggedIn && getMenuButtons(headersData)}
          {isLoggedIn && (
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
          onClick={label === "Log Out" ? handleLogout : null}
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
