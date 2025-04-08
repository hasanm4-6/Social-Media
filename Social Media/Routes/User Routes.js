const express = require("express")
const { registerUser, getUsers, updateUser, deleteUser, loginUser, getLoggedInUser, sendOTP, resetPassword} = require("../Controllers/User Controller")
const router = express.Router()
const authenticateUser = require('../Middleware/User Auth')

router.post("/", registerUser)      
router.get("/", getUsers)    
router.put("/:email", authenticateUser, updateUser)
router.delete("/:email", authenticateUser, deleteUser)
router.post("/login", loginUser)
router.get("/validateToken", getLoggedInUser)
router.post("/sendOtp", authenticateUser, sendOTP)
router.post("/resetPassword", authenticateUser, resetPassword)

module.exports = router

