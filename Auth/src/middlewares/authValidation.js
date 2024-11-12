const { client } = require("../utils/statusCodes");
const UserService = require("../services/userService");
const userService = new UserService();

const isAdmin = async (req, res, next) => {
  const token = req?.cookies?.authToken;
  // First check if authToken is provided.
  if (!token) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If authToken is present, verify the token
  const userObject = userService.verifyToken(token);
  if (!userObject.data) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Invalid Token",
      success: false,
      error: userObject.error,
    });
  }

  // If token is valid, verify if the user exist
  const user = await userService.getUser(userObject.data.id);
  if (!user) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "User not found.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If user exist, verify user is admin.
  if (user.role != "admin") {
    return res.status(client.FORBIDDEN).json({
      data: null,
      message: "Unauthorized user.",
      success: false,
      error: "Unauthorized",
    });
  }

  next();
};

const isUser = async (req, res, next) => {
  const token = req?.cookies?.authToken;
  // First check if authToken is provided.
  if (!token) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If authToken is present, verify the token
  const userObject = await userService.verifyToken(token);
  if (!userObject.data) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Invalid Token",
      success: false,
      error: userObject.error,
    });
  }

  // If token is valid, verify if the user exist
  const user = await userService.getUser(userObject.data.id);
  if (!user) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If user exist, verify userid passed same as of authtoken.
  const passedUsername = req.params.username;
  if (passedUsername != user.username) {
    return res.status(client.FORBIDDEN).json({
      data: null,
      message: "Unauthorized user.",
      success: false,
      error: "Unauthorized",
    });
  }

  next();
};

module.exports = {
  isAdmin,
  isUser,
};
