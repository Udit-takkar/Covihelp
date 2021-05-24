import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import turf, { point, distance } from "@turf/turf";
import { clustersDbscan, point, distance } from "@turf/turf";
import DriverCard from "./DriverCard";
import { useHistory } from "react-router-dom";
import LocationServiceApi from "../api/LocationService";

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
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [isLoaded, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [CustomerCoordinates, setCoordinates] = useState([]);
  // const sortedDistances = [
  //   { id: 1, distance: 20, name: "satish", address: "Bihar", coordinates: [] },
  //   { id: 3, distance: 35, name: "Ramesh", address: "Delhi", coordinates: [] },
  //   {
  //     id: 2,
  //     distance: 99,
  //     name: "Shobhit",
  //     address: "Rohini",
  //     coordinates: [],
  //   },
  // ];
  const handleClick = async (e) => {
    // const sortedDistances = [
    //   {
    //     id: 3,
    //     distance: 35,
    //     name: "satish",
    //     address: "Bihar",
    //     coordinates: [],
    //   },
    //   {
    //     id: 1,
    //     distance: 20,
    //     name: "Ramesh",
    //     address: "Delhi",
    //     coordinates: [],
    //   },
    //   {
    //     id: 2,
    //     distance: 99,
    //     name: "Shobhit",
    //     address: "Rohini",
    //     coordinates: [],
    //   },
    // ];
    // sortedDistances.sort(function (a, b) {
    //   if (a.distance < b.distance) {
    //     return 1;
    //   } else if (a.distance > b.distance) {
    //     return -1;
    //   } else return 0;
    // });
    const addressCoordinates = await LocationServiceApi.getGeocodeFromAddress(
      address
    );
    setCoordinates(addressCoordinates);
    const sortDistances = await LocationServiceApi.getClosestLocations(
      addressCoordinates
    );
    setDrivers(sortDistances);
  };

  const confirmBooking = ({ id, name, address, coordinates, distance }) => {
    // Dispatch Booking  HERE

    // Then redirect to Map or Save these coordinates in store
    history.push({
      pathname: "/mydashboard",
      state: {
        startCoordinates: CustomerCoordinates,
        DestCoordinates: coordinates,
        name,
        address,
      },
    });
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
                key={driver.id}
                name={driver.name}
                address={driver.address}
                coordinates={driver.coordinates}
                confirmBooking={confirmBooking}
                id={driver.id}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default Booking;
