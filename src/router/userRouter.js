const userRouter = require('express').Router()
const validateMiddleware = require('../middleware/validatorMiddleware')
const userController = require("../controllers/userController")
userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/", validateMiddleware, userController.createUser)
userRouter.put("/:id", validateMiddleware, userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter