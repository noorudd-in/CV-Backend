const { client } = require("../utils/statusCodes");
const { invalidToken } = require("../utils/htmlResponse");

const validateUserRegistration = (req, res, next) => {
  const { full_name, username, email, password } = req.body
  if (!full_name) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Full name is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!email) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!password) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Password is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!username) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Username is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!email.match(/^[\w-\.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/g)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is invalid.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (
    !password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    )
  ) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Password must be greater than 7 letters with atleast one uppercase, one lowercase, one number and one special character.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (String(username).length < 3) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Username must be greater than 3 characters.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Invalid username.",
      success: false,
      error: "Invalid request.",
    });
  }

  next();
};

const validateUserLogin = (req, res, next) => {
  const { username, email, password } = req.body
  if (!email && !username) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email or Username is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!password) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Password is required.",
      success: false,
      error: "Invalid request.",
    });
  }

  next();
};

const validateVerifyEmail = (req, res, next) => {
  const token = req?.query?.token
  if (!token) {
    return res.status(client.BAD_REQUEST).send(invalidToken);
  }
  next();
};

const validateResendEmailVerify = (req, res, next) => {
  if (!req.body.email) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  next()
}

const validateForgotPassword = (req, res, next) => {
  const { username, email } = req.body;
  if (!username && !email) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email or Username is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  next()
}

const validateNewPassword = (req, res, next) => {
  const { state, password } = req.body;
  if (!state || !password) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Link Expired.",
      success: false,
      error: "Invalid request.",
    });
  }
  next()
}

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateVerifyEmail,
  validateResendEmailVerify,
  validateForgotPassword,
  validateNewPassword
};
