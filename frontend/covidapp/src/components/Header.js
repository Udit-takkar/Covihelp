import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import UserServiceApi from "../api/UserServiceApi";
import uuid from "react-uuid";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
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

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Sign Up",
    href: "/signup",
  },
  {
    label: "Log in",
    href: "/login",
  },
];
const LoggedInHeader = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "my profile",
    href: "/myprofile",
  },
  {
    label: "my bookings",
    href: "/mybookings",
  },
  {
    label: "dashboard",
    href: "/dashboard",
  },
  {
    label: "Log Out",
    href: "/",
  },
];
const staffHeader = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Staff Dashboard",
    href: "/staff",
  },
  {
    label: "Log Out",
    href: "/",
  },
];

function Header() {
  const classes = useStyles();
  //   const isUserLoggedIn = UserServiceApi.isUserLoggedIn();
  //   const isUserStaff = UserServiceApi.isUserStaff();
  const isUserLoggedIn = true;
  const isUserStaff = true;
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {covidHelp}
        <div>
          {!isUserLoggedIn && getMenuButtons()}
          {isUserLoggedIn && (
            <>
              {!isUserStaff &&
                LoggedInHeader.map(({ label, href }) => {
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
                })}
            </>
          )}
          {isUserLoggedIn && (
            <>
              {isUserStaff &&
                staffHeader.map(({ label, href }) => {
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
                })}
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

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
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
