const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.post("/login", async (request, response, next) => {
  let userLoginDetails = request.body.userLoginDetails;
  let serverResponse = {
    message: "Successful login",
    token: "",
  };

  try {
    let usersLoginResult = await usersLogic.login(userLoginDetails);
    serverResponse.token = usersLoginResult;

    response.json(serverResponse);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let userRegisterDetails = request.body.userRegisterDetails;

  try {
    await usersLogic.addUser(userRegisterDetails);
    response.json("Registration Success");
  } catch (error) {
    return next(error);
  }
});
router.post("/validation", async (request, response, next) => {
  let potentialUserData = request.body.potentialUserData;

  try {
    await usersLogic.isUserAlreadyExists(potentialUserData);
    response.json("Please continue in the registration process.");
  } catch (error) {
    return next(error);
  }
});

router.get("/address", async (request, response, next) => {
  const userToken = request.headers.authorization;
  const decodedToken = jwt_decode(userToken);
  userId = decodedToken.id;

  try {
    const userAddressInfo = await usersLogic.getUserAddressInfo(userId);
    response.json(userAddressInfo);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
