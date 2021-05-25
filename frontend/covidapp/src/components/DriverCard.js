import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "40px",
    backgroundColor: "white",
    padding: "40px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
    color: "rgb(0,51,102)",
    maxWidth: "70vw",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ConfirmButton: {
    marginLeft: "50px",
    height: "50px",
  },
  details: {
    fontFamily: "Work Sans, sans-serif",
    fontSize: "20px",
  },
});

function DriverCard({
  name,
  address,
  distance,
  confirmBooking,
  coordinates,
  id,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid>
        {" "}
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Driver Name</strong> : {name}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Address</strong> : {address}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Distance from You </strong> : {distance} KM
        </Typography>
      </Grid>
      <Grid>
        <Button
          className={classes.ConfirmButton}
          variant="contained"
          color="primary"
          onClick={() => {
            confirmBooking(id); // Build this function
          }}
        >
          Confirm Booking
        </Button>
      </Grid>
    </Grid>
  );
}

export default DriverCard;
