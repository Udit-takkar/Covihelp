/* Location service APIs */
import axios from "axios";
import { clustersDbscan, point, distance } from "@turf/turf";

const api_url =
  process.env.server_url || "http://localhost:8000/api/ambulances";

class LocationServiceApi {
  getAllLocations() {
    return axios.get(api_url);
  }

  // getLocationFromId(id) {
  //     return axios.get(`${api_url}/${id}`);
  // }

  async getClosestLocations(intialCoordinates) {
    var from = point(intialCoordinates);
    console.log(intialCoordinates);
    const sortedDistances = [];
    const locations = await axios.get(api_url);

    // get all drivers Location
    const ambulances = locations.data.ambulances;
    console.log(ambulances);
    ambulances.map((ambulance) => {
      var to = ambulance.coordinates;

      var Calcdistance = distance(from, to);

      return sortedDistances.push({
        distance: Calcdistance,
        _id: ambulance._id,
        name: ambulance.driversName,
        address: ambulance.address,
        coordinates: ambulance.coordinates,
        numberplate: ambulance.numberplate,
        contact: ambulance.contact,
        available: ambulance.available,
        password: ambulance.password,
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
