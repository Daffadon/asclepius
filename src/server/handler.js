const { predictClassification } = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const getData = require("../services/getData");

const postPredictionHandler = async (req, h) => {
  const { model } = req.server.app;
  const { image } = req.payload;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };
  await storeData(id, data);
  const response = h.response({
    status: "success",
    message: "Model is predicted succesfully",
    data,
  });
  response.code(201);
  return response;
};

const getPredictionHistoriesHandler = async (req, h) => {
  try {
    const result = await getData();
    const response = h.response({
      status: "success",
      data: result,
    });
    response.code(200);
    return response;
  } catch {}
};

module.exports = { postPredictionHandler, getPredictionHistoriesHandler };
