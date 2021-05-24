import React, { useState } from "react";
import photo from "./AmbulanceIllustration.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Grid, Box } from "@material-ui/core";
import { isUserLoggedIn } from "../../features/authentication/auth";
import { useSelector } from "react-redux";

import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    overflowX: "hidden",
    backgroundColor: "white",
    // backgroundColor: "blue",
  },
  heading: {
    // backgroundColor: "blue",
    fontFamily: "Playfair Display",
    fontSize: "60px",
    marginLeft: "75px",
    color: "rgb(0,51,102)",
  },
  photo: {
    // marginRight: "10000px",
  },
  leftContainer: {},
  subtext: {
    fontFamily: "Inter",
    fontSize: "20px",
    marginLeft: "75px",
    marginTop: "20px",
    color: "rgb(102,153,204)",
  },
  signupButton: {
    marginLeft: "75px",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    width: "200px",
    fontFamily: "Inter",
    fontSize: "15px",
    letterSpacing: "4px",
    backgroundColor: "rgb(0,51,102)",
  },
  section: {
    padding: "0px 75px 75px 75px",
  },
}));

function Landing() {
  const classes = useStyles();
  const isLoggedIn = useSelector(isUserLoggedIn);
  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid className={classes.leftContainer} item xs={6}>
        <Typography className={classes.heading} component="h1" variant="h5">
          Book Urgent Ambulance Near You
        </Typography>
        <Typography className={classes.subtext} component="h1" variant="h5">
          Free signup and booking in less than 5 minutes
        </Typography>

        {isLoggedIn ? (
          <Button
            {...{
              color: "inherit",
              to: "/mybookings",
              component: RouterLink,
              className: classes.signupButton,
            }}
            variant="contained"
            color="primary"
          >
            Book Now
          </Button>
        ) : (
          <>
            <Button
              {...{
                color: "inherit",
                to: "/signup",
                component: RouterLink,
                className: classes.signupButton,
              }}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </>
        )}
      </Grid>
      <Grid item xs={6}>
        <img className={classes.photo} src={photo} alt="main" />
      </Grid>
      <Grid container justify="center">
        <Menu />
      </Grid>
    </Grid>
  );
}

export default Landing;
