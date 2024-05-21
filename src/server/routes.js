const {
  postPredictionHandler,
  getPredictionHistoriesHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/predict",
    handler: postPredictionHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1e6,
      },
    },
  },
  {
    method: "GET",
    path: "/predict/histories",
    handler: getPredictionHistoriesHandler,
  },
];

module.exports = routes;
