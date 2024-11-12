const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser,
  getProfile,
  verifyEmail,
  resendEmail,
  resetUsername,
  resetPassword,
  updatePassword
} = require("../../controllers/userController");

const {
  validateUserLogin,
  validateUserRegistration,
  isAdmin,
  isUser,
  validateVerifyEmail,
  validateResendEmailVerify,
  validateForgotPassword,
  validateNewPassword
} = require("../../middlewares/index");

// Register & Login a user
router.post("/register", validateUserRegistration, createUser);
router.post("/login", validateUserLogin, loginUser);

// Fetch user profile (after authentication)
router.get("/profile/:username", isUser, getProfile);

// Update, Delete or Fetch User details [Only for Admin]
router.patch("/user/:id", isAdmin, updateUser);
router.delete("/user/:id", isAdmin, deleteUser);
router.get("/user/:id", isAdmin, getUser);
router.get("/users", isAdmin, getAllUser);

// Verify Email Address
router.get('/verify-email', validateVerifyEmail, verifyEmail)
// Resend Email Verification
router.post('/resend-verification-email', validateResendEmailVerify, resendEmail)
// Forgot Password
router.post('/forgot-username', validateResendEmailVerify, resetUsername)
// API to sent an email with the password reset link.
router.post('/forgot-password', validateForgotPassword, resetPassword);
// API to verify the reset password email token and then update the password.
router.post('/forgot-password-verify', validateNewPassword, updatePassword)

module.exports = router;
