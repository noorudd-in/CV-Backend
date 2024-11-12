const {
  validateUserRegistration,
  validateUserLogin,
  validateVerifyEmail,
  validateResendEmailVerify,
  validateForgotPassword,
  validateNewPassword
} = require("./validateUser");
const { isAdmin, isUser } = require("./authValidation");
module.exports = {
  validateUserRegistration,
  validateUserLogin,
  isAdmin,
  isUser,
  validateVerifyEmail,
  validateResendEmailVerify,
  validateForgotPassword,
  validateNewPassword
};
