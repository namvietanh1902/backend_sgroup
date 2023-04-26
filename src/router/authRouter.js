const authRouter = require('express').Router()
const validateMiddleware = require('../middleware/validatorMiddleware')
const authController = require("../controllers/authController")
const {loginMiddleware,registerMiddleware} =require('../middleware/validatorMiddleware')
authRouter.post("/register",registerMiddleware,authController.register)
// authRouter.get("/verify", userController.verify)
authRouter.post("/login", loginMiddleware, authController.login)


module.exports = authRouter