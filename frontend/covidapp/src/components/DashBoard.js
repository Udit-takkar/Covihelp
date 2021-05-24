import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import LocationServiceApi from "../api/LocationService";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const useStyles = makeStyles({
  root: {
    height: "100vh",
    marginTop: "75px",
    // marginBottom    : "75px",
  },
  navStyle: {
    position: "absolute",
    top: 36,
    left: 0,
    padding: "10px",
  },
  fullscreenControlStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  },
  details: {
    fontFamily: "Work Sans, sans-serif",
    fontSize: "20px",
  },
  container: {
    marginTop: "40px",
    backgroundColor: "white",
    padding: "40px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
    color: "rgb(0,51,102)",
    alignItems: "flex-start",
    maxWidth: "50vw",
    marginBottom: "40px",
    marginLeft: "300px",
  },
});
function DashBoard() {
  const mapRef = useRef();
  const classes = useStyles();
  const location = useLocation();
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: [-73.985664, 40.748514],
        zoom: 12,
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });
      map.on("load", function () {
        // directions.setOrigin([77.0878, 28.6219]);
        // directions.setDestination([77.0929, 28.6691]);
        directions.setOrigin(location.state.startCoordinates);

        directions.setDestination(location.state.DestCoordinates);
      });

      map.addControl(directions, "top-left");
    };
    if (location.state !== undefined) {
      setShowMap(true, initializeMap());
    }
  }, []);

  return (
    <div className={classes.root}>
      {!showMap ? (
        <Grid container justify="center" alignItems="center">
          <Typography
            className={classes.details}
            style={{ marginTop: "200px" }}
            variant="h3"
            gutterBottom
          >
            <strong> First Place Booking To See Dashboard</strong>
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            className={classes.container}
            direction="column"
            container
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.details} variant="h5" gutterBottom>
              <strong> Driver Name</strong> :{/* {location.state.name} */}
            </Typography>
            <Typography className={classes.details} variant="h5" gutterBottom>
              <strong> Address</strong> :{/* {location.state.address} */}
            </Typography>
          </Grid>
          <div
            style={{ width: "100vw", height: " 100vh" }}
            ref={mapRef}
            className="mapWrapper"
          />
        </>
      )}
    </div>
  );
}

export default DashBoard;
