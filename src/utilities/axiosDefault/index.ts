import axiosDefault from "./createDefault";

export function JobAxios({
  method = "GET",
  url = "",
  data = {},
  headers = {},
}) {
  return new Promise((resolve, reject) => {
    axiosDefault({
      method: method.toUpperCase(),
      url,
      data,
      headers: headers,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
