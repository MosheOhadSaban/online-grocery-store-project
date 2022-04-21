const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const validateUser = require("../http-utilities/validateUserData");

async function login(userLoginDetails) {
  userLoginDetails.password = crypto
    .createHash("md5")
    .update(saltLeft + userLoginDetails.password + saltRight)
    .digest("hex");

  let usersLoginResult = await usersDao.login(userLoginDetails);

  if (usersLoginResult == null || usersLoginResult.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  const token = jwt.sign(
    {
      id: usersLoginResult.id,
      userType: usersLoginResult.userType,
      email: usersLoginResult.email,
      firstName: usersLoginResult.firstName,
      lastName: usersLoginResult.lastName,
    },
    config.secret
  );
  return token;
}

async function addUser(userRegisterDetails) {
  validateUser.validateUserDataRegister(userRegisterDetails);
  userRegisterDetails.password = crypto
    .createHash("md5")
    .update(saltLeft + userRegisterDetails.password + saltRight)
    .digest("hex");

  await usersDao.addUser(userRegisterDetails);
}

async function isUserAlreadyExists(potentialUserData) {
  let isUserAlreadyExsitByEmail = await usersDao.isUserAlreadyExistsbByEmail(
    potentialUserData
  );
  let isUserAlreadyExsitById = await usersDao.isUserAlreadyExistsbById(
    potentialUserData
  );

  if (isUserAlreadyExsitByEmail == 1 || isUserAlreadyExsitById == 1) {
    throw new ServerError(ErrorType.USER_ALREADY_EXIST);
  }
}

async function getUserAddressInfo(userId) {
  const userAddressInfo = await usersDao.getUserAddressInfo(userId);
  return userAddressInfo;
}

module.exports = {
  login,
  addUser,
  isUserAlreadyExists,
  getUserAddressInfo,
};
