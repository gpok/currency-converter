import axios from "axios";

const url = "https://openexchangerates.org/api/";
const key = "bd35b2e981784018a6c65e183ea83294";

const GetCurrencies = (successEvent, errorEvent) => {
  axios
    .request({
      url: `${url}currencies.json`,
      method: "get",
      responseType: "json",
    })
    .then(function (response) {
      // const dt = Object.keys(response.data).reduce(
      //   (prev, cur) => ({ ...prev, [cur]: cur }),
      //   {}
      // );
      successEvent(Object.keys(response.data));
    })
    .catch(function (error) {
      errorEvent(error);
    });
};
const ConvertCurrency = (from, to, value, successEvent, errorEvent) => {
  axios
    .request({
      url: `${url}latest.json`,
      method: "get",
      responseType: "json",
      params: {
        app_id: key,
      },
      crossdomain: true,
    })
    .then(function (response) {
      successEvent(
        Math.floor(
          (value / response.data.rates[from]) * response.data.rates[to] * 100
        ) / 100
      );
    })
    .catch(function (error) {
      errorEvent(error);
    });
};

const OpenExchangeRatesApi = {
  GetCurrencies,
  ConvertCurrency,
};
export default OpenExchangeRatesApi;
