const router = require('express').Router();
const { apiLimiter } = require('../middleware/access.limiter');
const { isAuthenticatedUser, isRefreshTokenValid, isBlocked } = require('../middleware/app.authentication.cjs');
const {
  register, loginUser, logoutUser, forgotPassword, resetPassword, changePassword, sendEmailVerificationLink, emailVerification, refreshToken
} = require('../controllers/auth.cjs');

// routes for register, login and logout user
router.route('/auth/registration').post(register);
router.route('/auth/login').post(apiLimiter, loginUser);
router.route('/auth/logout').post(isAuthenticatedUser, isBlocked, logoutUser);

// routes for forgot & change password
router.route('/auth/forgot-password').post(forgotPassword);
router.route('/auth/reset-password/:token').post(resetPassword);
router.route('/auth/change-password').post(isAuthenticatedUser, isBlocked, changePassword);

// routes for user email verification
router.route('/auth/send-email-verification-link').post(isAuthenticatedUser, isBlocked, sendEmailVerificationLink);
router.route('/auth/verify-email/:token').post(isAuthenticatedUser, isBlocked, emailVerification);

// route for get user refresh JWT Token
router.route('/auth/refresh-token').get(isRefreshTokenValid, refreshToken);

module.exports = router;
