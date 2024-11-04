import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

const baseURL = "https://skills-api-zeta.vercel.app/";

const axiosDefault = axios.create({
  baseURL: baseURL,
  transformRequest: function (body) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    return formData;
  },
});

axiosDefault.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const getError = new ErrorResponse().getError(error);
    return Promise.reject(getError);
  }
);

export default axiosDefault;
