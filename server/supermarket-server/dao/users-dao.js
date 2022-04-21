let connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function login(userLoginDetails) {
  let sql =
    "SELECT id, user_type AS userType, email, first_name AS firstName, last_name AS lastName FROM users WHERE email=? AND password=?";
  let parameters = [userLoginDetails.email, userLoginDetails.password];

  try {
    let usersLoginResult = await connection.executeWithParameters(
      sql,
      parameters
    );
    return usersLoginResult[0];
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userLoginDetails.email, userLoginDetails.password),
      e
    );
  }
}

async function addUser(userRegisterDetails) {
  userRegisterDetails.userType = "CUSTOMER";
  let sql =
    "INSERT INTO users (id, email, password, first_name, last_name, user_type, city, street)  values(?, ?, ?, ?, ?, ?, ?, ?)";

  let parameters = [
    userRegisterDetails.id,
    userRegisterDetails.email,
    userRegisterDetails.password,
    userRegisterDetails.firstName,
    userRegisterDetails.lastName,
    userRegisterDetails.userType,
    userRegisterDetails.city,
    userRegisterDetails.street,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userRegisterDetails),
      e
    );
  }
}

async function isUserAlreadyExistsbByEmail(potentialUserData) {
  let sql = "SELECT COUNT(1) as namesCount FROM users WHERE email=?";
  let parameters = [potentialUserData.email];

  try {
    let checkedEmail = await connection.executeWithParameters(sql, parameters);
    checkedEmail = checkedEmail[0].namesCount;
    return checkedEmail;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(potentialUserData.email),
      e
    );
  }
}
async function isUserAlreadyExistsbById(potentialUserData) {
  let sql = "SELECT COUNT(1) as namesCount FROM users WHERE id=?";
  let parameters = [potentialUserData.id];

  try {
    let checkedId = await connection.executeWithParameters(sql, parameters);

    checkedId = checkedId[0].namesCount;
    return checkedId;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(potentialUserData.email),
      e
    );
  }
}

async function getUserAddressInfo(userId) {
  let sql = "SELECT city, street FROM users WHERE id=?";
  let parameters = [userId];

  try {
    const userAddressInfo = await connection.executeWithParameters(
      sql,
      parameters
    );
    return userAddressInfo[0];
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userId),
      e
    );
  }

  }


module.exports = {
  login,
  addUser,
  isUserAlreadyExistsbByEmail,
  isUserAlreadyExistsbById,
  getUserAddressInfo,
};
