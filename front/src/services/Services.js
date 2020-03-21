import axios from "axios";

const URL_BASE = "http://localhost:3030";

const axiosInstance = axios.create({
  baseURL: URL_BASE,
  mode: "cors"
});

export default {
  cities: {
    fetch: () => axiosInstance.get("/cities?offset=0&limit=10"),
    fetchByFilter: value => axiosInstance.get(`/cities?filter=${value}`),
    fetchPreferences: () => axiosInstance.get("/preferences/cities"),
    selectCity: city => axiosInstance.patch("/preferences/cities", city)
  }
};
