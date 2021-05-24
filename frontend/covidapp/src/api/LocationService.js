/* Location service APIs */
import axios from "axios";
import { clustersDbscan, point, distance } from "@turf/turf";

const api_url = process.env.server_url || "http://localhost:8000/api/locations";

class LocationServiceApi {
  getAllLocations() {
    return axios.get(api_url);
  }

  // getLocationFromId(id) {
  //     return axios.get(`${api_url}/${id}`);
  // }

  getClosestLocations(intialCoordinates) {
    var from = point(intialCoordinates);
    const sortedDistances = [];
    const locations = fetch(api_url).then((res) => res.json()); // get all drivers Location
    locations.map((location) => {
      var to = location.coordinates;
      var Calcdistance = distance(from, to);

      return sortedDistances.push({
        distance: Calcdistance,
        _id: location._id,
        name: location.name,
        address: location.address,
        coordinates: location.coordinates,
      });
      //   console.log(Calcdistance);
    });

    sortedDistances.sort(function (a, b) {
      if (a.distance > b.distance) {
        return 1;
      } else if (a.distance < b.distance) {
        return -1;
      } else return 0;
    });
    return sortedDistances;

    // var options = { units: "miles" };
    // var distances = distance(from, to);
    // console.log(distances);
  }

  getGeocodeFromAddress(address) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const acess_token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const formatted_address = address.replace(/ /g, "+");
    return axios.get(
      `${url + formatted_address}.json?access_token=${acess_token} `
    );
  }

  updateLocation(location) {
    return axios.patch(api_url + `/${location._id}`, location);
  }
}

export default new LocationServiceApi();
