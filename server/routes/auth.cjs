const express = require('express');

const {  signup,
    signin,
    googleAuthSignIn,
    logout,
    generateOTP,
    verifyOTP,
    createResetSession,
    findUserByEmail,
    resetPassword }=require ("../controllers/auth.cjs");
const { localVariables }=require ("../middleware/auth.cjs");

const router = express.Router();

//create a user
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//logout
router.post("/logout", logout);
//google signin
router.post("/google", googleAuthSignIn);
//find user by email
router.get("/findbyemail", findUserByEmail);
//generate opt
router.get("/generateotp",localVariables, generateOTP);
//verify opt
router.get("/verifyotp", verifyOTP);
//create reset session
router.get("/createResetSession", createResetSession);
//forget password
router.put("/forgetpassword", resetPassword);




module.exports= router;