const urlUtil = require("../utils/urlUtil");
const AppError = require(urlUtil.getPath("../errors/appError.min.js"));
const regexConstants = require(urlUtil.getPath(
  "../constants/regexConstants.min.js"
));

/**
Ensure that all required fields in a registration form are not null and valid.
@param {*} data Data request.
*/
function validateAddUserData(data) {
  if (!data.email) {
    throw new AppError("E-mail is mandatory");
  } else if (!data.fullname) {
    throw new AppError("Fullname is mandatory");
  } else if (!data.password) {
    throw new AppError("Password is mandatory");
  } else if (!regexConstants.email.test(data.email)) {
    throw new AppError("E-mail not valid");
  } else if (data.role != "1" && data.role != "0") {
    throw new AppError("Invalid user type");
  }
}

function validateLoginUserData(data) {
  if (!data.email) {
    throw new AppError("E-mail is mandatory");
  } else if (!data.password) {
    throw new AppError("Password is mandatory");
  } else if (!regexConstants.email.test(data.email)) {
    throw new AppError("E-mail not valid");
  }
}

/**
 * Exportação.
 */
module.exports = {
  validateAddUserData,
  validateLoginUserData,
};
