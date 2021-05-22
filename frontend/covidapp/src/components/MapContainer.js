import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useEffect, useRef, useState } from "react";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import { makeStyles } from "@material-ui/core/styles";
import { Marker } from "react-map-gl";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const useStyles = makeStyles({
  root: {
    height: "100vh",
    marginTop: "75px",
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
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        Use the search bar to find a location on the map
      </h1>
      <MapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        width="100%"
        height="90%"
        onViewportChange={setViewPort}
        mapboxApiAccessToken={token}
      >
        {/* <button className="add-btn" onClick={this.addMarker}>Add</button>
         <Marker
            
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              <img src="pin.png" alt="marker"/>
            </Marker> */}
        {/* {markers.map((marker, idx) => {
          return (
            <Marker
              key={idx}
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              <img src="pin.png" alt="marker"/>
            </Marker>
          )
        })
        } */}
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
  );
};

export default SearchableMap;
