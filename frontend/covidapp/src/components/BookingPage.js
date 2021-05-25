import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import turf, { point, distance } from "@turf/turf";
import { clustersDbscan, point, distance } from "@turf/turf";
import DriverCard from "./DriverCard";
import { useHistory, Redirect } from "react-router-dom";
import LocationServiceApi from "../api/LocationService";
import { getAmbulance } from "../api/BookingService";
import { getUserId } from "../features/authentication/auth";
import { useSelector, useDispatch } from "react-redux";
import UserServiceApi from "../api/UserServiceApi";
import { createbooking } from "../features/booking/Booking";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    marginTop: "75px",
    // marginBottom    : "75px",
  },

  BookingButton: {
    marginLeft: "50px",
    height: "50px",
  },
  textField: {
    width: "700px",
  },
  LocationContainer: {
    marginTop: "40px",
    backgroundColor: "white",
    padding: "75px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
    color: "rgb(0,51,102)",
    marginBottom: "50px",
  },
});

function Booking() {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [isLoaded, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [CustomerCoordinates, setCoordinates] = useState([]);
  const userId = useSelector(getUserId);

  const handleClick = async (e) => {
    const addressCoordinates = await LocationServiceApi.getGeocodeFromAddress(
      address
    );

    setCoordinates(addressCoordinates.data.features[0].center);
    const sortDistances = await LocationServiceApi.getClosestLocations(
      addressCoordinates.data.features[0].center
    );
    console.log(sortDistances);
    setDrivers(sortDistances);
  };

  const confirmBooking = async (id) => {
    // Dispatch Booking  HERE

    const ambulance = await getAmbulance(id);
    try {
      const res = await dispatch(
        createbooking({
          user: userId,
          ambulance: id,
          userCoordinates: CustomerCoordinates,
          ambulanceCoordinates: ambulance.ambulance.coordinates,
        })
      );
      console.log(res);
      if (res.type === "booking/createbooking/fulfilled") {
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.LocationContainer}>
          <TextField
            className={classes.textField}
            name="address"
            id="outlined-basic"
            label="Enter Your Full Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            className={classes.BookingButton}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Request Booking
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        {isLoaded ? (
          <span></span>
        ) : (
          drivers.map((driver) => {
            return (
              <DriverCard
                key={driver._id}
                name={driver.name}
                address={driver.address}
                coordinates={driver.coordinates}
                confirmBooking={confirmBooking}
                id={driver._id}
                distance={driver.distance}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default Booking;
