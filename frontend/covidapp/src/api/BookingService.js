import axios from "axios";

const url = "http://localhost:8000/api/ambulances/";

export const getAmbulance = async (id) => {
  const res = await axios.get(`${url}${id}`);
  console.log(res);
  return res.data;
};
