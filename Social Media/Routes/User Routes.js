const express = require("express")
const { registerUser, getUsers, updateUser, deleteUser, loginUser, getLoggedInUser, sendOTP, changePassword, resetPassword} = require("../Controllers/User Controller")
const router = express.Router()
const authenticateUser = require('../Middleware/User Auth')

router.post("/", registerUser)      
router.get("/", getUsers)    
router.put("/:email", authenticateUser, updateUser)
router.delete("/:email", authenticateUser, deleteUser)
router.post("/login", loginUser)
router.get("/validateToken", getLoggedInUser)
router.post("/sendOtp", sendOTP)
router.post("/resetPassword", resetPassword)
router.post("/changePassword", authenticateUser, changePassword)

module.exports = router

