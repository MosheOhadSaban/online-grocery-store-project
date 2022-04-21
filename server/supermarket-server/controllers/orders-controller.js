const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const ordersLogic = require("../logic/orders-logic");

router.get("/", async (request, response, next) => {
  try {
    const ordersAmount = await ordersLogic.getOrdersAmount();
    response.json(ordersAmount);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  const orderInfo = request.body;

  try {
    const serverResponse = await ordersLogic.addOrder(orderInfo);
    response.json(serverResponse);
  } catch (error) {
    return next(error);
  }
});

router.get("/user", async (request, response, next) => {
  const userToken = request.headers.authorization;
  const decodedToken = jwt_decode(userToken);
  userId = decodedToken.id;

  try {
    const userLastOrder = await ordersLogic.getUserLastOrderDate(userId);
    response.json(userLastOrder);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
