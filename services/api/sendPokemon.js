const axios = require("axios");
const axiosRetry = require("axios-retry");
const FormData = require("form-data");
const config = require("./config.json");

axiosRetry(axios, {
  retries: 3,
  retryDelay: retryCount => {
    return retryCount * 10000;
  }
});

axios.interceptors.response.use(config => {
  const retryState = config["axios-retry"] || {};

  if (retryState.retryCount > 0) {
    console.log("Retrying");
    config.headers["x-retry-count"] = retryState.retryCount;
  }

  return config;
});

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

function sendPokemon(data) {
  const base64 = data.toString("base64");
  const bodyFormData = new FormData();
  bodyFormData.append("pkx", base64);

  return axios({
    method: "post",
    url: config.url,
    data: bodyFormData
  })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log("ERROR");
      console.log(error.message);
    });
}

module.exports = sendPokemon;
