import React from "react";
import photo from "./AmbulanceIllustration.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";

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
}));

function Landing() {
  const classes = useStyles();
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
      </Grid>
      <Grid item xs={6}>
        <img className={classes.photo} src={photo} alt="main" />
      </Grid>
    </Grid>
  );
}

export default Landing;
