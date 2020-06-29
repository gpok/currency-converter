// ToDo
// import axios from "axios";
//
// const url = "https://free.currconv.com/api/v7/";
// const key = "7888b9409f7b96220d6";
//
// const GetCurrencies = (successEvent, errorEvent) => {
//   axios
//     .request({
//       url: `${url}currencies`,
//       method: "get",
//       responseType: "json",
//       params: {
//         apiKey: key,
//       },
//     })
//     .then(function (response) {
//       successEvent(response.data);
//     })
//     .catch(function (error) {
//       errorEvent(error);
//     });
// };
// const ConvertCurrency = (successEvent, errorEvent) => {
//   axios
//     .request({
//       url,
//       method: "get",
//       responseType: "json",
//       params: {
//         apiKey: key,
//       },
//     })
//     .then(function (response) {
//       successEvent(response.data);
//     })
//     .catch(function (error) {
//       errorEvent(error);
//     });
// };
//
// const CurrencyConverterApi = {
//   GetCurrencies,
//   ConvertCurrency,
// };
// export default CurrencyConverterApi;
