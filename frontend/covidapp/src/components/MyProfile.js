import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  getName,
  getEmail,
  isUserLoggedIn,
  getUserType,
} from "../features/authentication/auth";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  details: {
    fontFamily: "Inter",
    // alignSelf: "flex-start",
  },
  profileContainer: {
    padding: "75px",
    maxWidth: "40vw",

    boxShadow:
      " 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)",
    color: "rgb(0,51,102)",
  },
  detailsHeading: {
    position: "relative",
    bottom: "50px",
    fontFamily: "Playfair Display",
  },
});
function MyProfile() {
  const classes = useStyles();
  const Name = useSelector(getName);
  const Email = useSelector(getEmail);
  const UserType = useSelector(getUserType);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        className={classes.profileContainer}
        container
        direction="column"
        justify="center"
      >
        <Typography
          className={classes.detailsHeading}
          variant="h3"
          gutterBottom
        >
          My Profile
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          Name : {Name}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          Email :{Email}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          Account Type :{UserType}
        </Typography>
        <Button
          style={{ marginTop: "30px" }}
          variant="contained"
          color="primary"
        >
          Go To Your Bookings
        </Button>
      </Grid>
    </Grid>
  );
}

export default MyProfile;
