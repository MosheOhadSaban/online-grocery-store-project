const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

function validateUserDataLogin(userData) {
  // Validations
  if (!userData.password) {
    throw new ServerError(ErrorType.INVALID_PASSWORD);
  }

  if (!userData.email) {
    throw new ServerError(ErrorType.INVALID_USER_NAME);
  }
}

function validateUserDataRegister(userData) {
  // Validations
  if (!userData.password) {
    throw new ServerError(ErrorType.MISSING_USER_INFO);
  }

  if (!userData.email) {
    throw new ServerError(ErrorType.MISSING_USER_INFO);
  }
  if (!userData.firstName) {
    throw new ServerError(ErrorType.MISSING_USER_INFO);
  }
  if (!userData.lastName) {
    throw new ServerError(ErrorType.MISSING_USER_INFO);
  }
}



module.exports = {
  validateUserDataLogin,
  validateUserDataRegister,
};
