import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useEffect, useRef, useState } from "react";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import { makeStyles } from "@material-ui/core/styles";
import { Marker, NavigationControl, FullscreenControl } from "react-map-gl";
import CityPin from "../util/city-pin";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const CITIES = [
  {
    latitude: 28.6691,
    longitude: 77.0929,
  },
  {
    latitude: 28.7383,
    longitude: 77.0822,
  },
  {
    latitude: 28.66667000000001,
    longitude: 77.21667,
  },
];

const _renderMarker = (city, index) => {
  return (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
    >
      <CityPin size={20} />
    </Marker>
  );
};

const useStyles = makeStyles({
  root: {
    height: "100vh",
    marginTop: "75px",
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
  map: {
    position: "absolute",
    top: "200px",
    bottom: "0",
    width: "100%",
  },
  BookingButton: {
    marginLeft: "50px",
  },
});

const SearchableMap = () => {
  const classes = useStyles();
  const [viewport, setViewPort] = useState({
    latitude: 28.66667000000001,
    longitude: 77.21667,
    zoom: 10,
    transitionDuration: 100,
  });
  // const [markers,setMarkers]=useState({   currMarker: null,
  //   markers: []})
  const [searchResultLayer, setSearchResult] = useState(null);

  const mapRef = useRef();

  const handleOnResult = (event) => {
    console.log(event.result);
    setSearchResult(
      new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      })
    );
  };

  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log("Updating");
    console.log(viewport);
    return setViewPort({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  useEffect(() => {
    console.log({ viewport });
  }, [viewport]);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.instructionText}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Below Map shows all Available Drivers
          </Typography>
          <Typography variant="h5" gutterBottom>
            Use the Search Bar to Enter Your Area
          </Typography>
        </Grid>
        <Grid item className={classes.BookingButton}>
          <Button variant="contained" color="primary">
            Place Bookings
          </Button>
        </Grid>
      </Grid>
      <div className={classes.map}>
        <MapGL
          ref={mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="90%"
          onViewportChange={setViewPort}
          mapboxApiAccessToken={token}
        >
          {CITIES.map(_renderMarker)}
          <div className={classes.fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className={classes.navStyle}>
            <NavigationControl />
          </div>

          <Geocoder
            mapRef={mapRef}
            onResult={handleOnResult}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            position="top-left"
          />
        </MapGL>
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </div>
    </div>
  );
};

export default SearchableMap;
