const UserService = require("../services/userService");
const { success, client, server } = require("../utils/statusCodes");
const sendEmail = require("../utils/sendVerifyEmail");
const { BASE_URL } = require("../config/constants");
const { cleanEmail } = require('../utils/helper')
const {
  invalidToken,
  emailAlreadyVerified,
  emailVerified,
} = require("../utils/htmlResponse");

const userService = new UserService();

const createUser = async (req, res) => {
  const { username, full_name, email, password } = req.body
  const newEmail = cleanEmail(email);
  const checkUsername = await userService.getUserByUsername(username.toLowerCase());
  if (checkUsername) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Username already exist.",
      success: false,
      error: "Invalid request.",
    });
  }
  const checkEmail = await userService.getUserByEmail(newEmail);
  if (checkEmail) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email already exist.",
      success: false,
      error: "Invalid request.",
    });
  }

  try {
    const user = await userService.createUser({ username, full_name, email: newEmail, password });
    if (user.success == false) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: user.message,
        error: user.error,
      });
    }
    const authToken = userService.createToken(
      {
        id: user.id,
      },
      "2h"
    );
    sendEmail(
      user.email,
      user.full_name,
      `${BASE_URL}/auth/api/v1/verify-email?token=${authToken}`
    );
    return res.status(success.CREATED).json({
      data: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
      },
      success: true,
      message:
        "User registered. Please check your email to verify your account.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot create a user.",
      error: { error },
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user || user[0] == 0) {
      return res.status(client.NOT_FOUND).json({
        data: user,
        success: false,
        message: "User you want to update, doesn't exist!",
        error: {},
      });
    }
    return res.status(success.CREATED).json({
      data: user,
      success: true,
      message: "User updated successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot update a user.",
      error: { error },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: null,
        success: false,
        message: "The user you want to delete doesn't exist!",
        error: {},
      });
    }
    return res.status(success.CREATED).json({
      data: user,
      success: true,
      message: "User deleted successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot delete a user.",
      error: { error },
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: user,
        success: false,
        message: "User you specified doesn't exist!",
        error: {},
      });
    }
    return res.status(success.OK).json({
      data: user,
      success: true,
      message: "User fetched successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch a user.",
      error: { error },
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userService.getAllUser();
    return res.status(success.OK).json({
      data: user,
      success: true,
      message: "All users fetched successfully.",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch users.",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    let user;
    if (username) {
      user = await userService.getUserByUsername(username);
    }
    if (email) {
      user = await userService.getUserByEmail(email);
    }
    if (!user) {
      return res.status(client.UNAUTHORISED).json({
        data: null,
        success: false,
        message: "Invalid credentials.",
        error: "User is not authenticated.",
      });
    }
    const checkPassword = userService.verifyPassword(
      password,
      user.password
    );

    if (!checkPassword) {
      return res.status(client.UNAUTHORISED).json({
        data: null,
        success: false,
        message: "Invalid credentials.",
        error: "User is not authenticated.",
      });
    }
    if (!user.is_verified) {
      return res.status(client.UNAUTHORISED).json({
        data: null,
        success: false,
        message: "Verify your email address before login.",
        error: "Email not verified.",
      });
    }
    const authToken = userService.createToken(
      {
        id: user.id,
        email: user.email,
      },
      "7d"
    );
    return res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'Strict'
    }).status(success.OK).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      success: true,
      message: "User logged in successfully.",
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot login user.",
      error: error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: null,
        success: false,
        message: "User not found.",
        error: 'Invalid request.',
      });
    }
    return res.status(success.OK).json({
      data: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      success: true,
      message: "User fetched successfully.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch the user.",
      error: error,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const result = userService.verifyToken(req.query.token);
    if (!result.data) {
      return res.status(client.BAD_REQUEST).send(invalidToken);
    }
    const user = await userService.getUser(result.data.id);
    if (!user) {
      return res.status(client.BAD_REQUEST).send(invalidToken);
    }
    if (user.is_verified) {
      return res.status(success.OK).send(emailAlreadyVerified);
    } else {
      const updatedUser = await userService.updateUser(user.id, {
        is_verified: true,
      });
      return res.status(success.OK).send(emailVerified);
    }
  } catch (error) {
    console.log(error);
    return res.status(client.BAD_REQUEST).send(invalidToken);
  }
};

const resendEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (user && !user.is_verified) {
      const authToken = userService.createToken(
        {
          id: user.id,
        },
        "2h"
      );
      sendEmail(
        user.email,
        user.full_name,
        `${BASE_URL}/auth/api/v1/verify-email?token=${authToken}`
      );
    }
    return res.status(success.OK).json({
      data: 'If user exist and not verified, an email will be sent.',
      success: true,
      message: "Email send in the inbox.",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch the user.",
      error: error,
    });
  }
};

const resetUsername = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(success.OK).json({
        data: null,
        success: true,
        message: "If account exist, you will receive an email.",
        error: null
      })
    }
    if (password) {
      const checkPassword = userService.verifyPassword(
        password,
        user.password
      );
      if (!checkPassword) {
        return res.status(client.UNAUTHORISED).json({
          data: null,
          success: false,
          message: "Invalid credentials.",
          error: "User is not authenticated.",
        });
      } else {
        return res.status(success.OK).json({
          data: {
            username: user.username
          },
          success: true,
          message: null,
          error: null
        })
      }
    }

    // Assuming password is not provided so sending email
    return res.status(success.OK).json({
      data: null,
      success: true,
      message: 'If account exist, you will receive an email.',
      error: null
    })
  } catch (error) {
    console.log(error);
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch the username.",
      error: error,
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser,
  getProfile,
  verifyEmail,
  resendEmail,
  resetUsername
};
