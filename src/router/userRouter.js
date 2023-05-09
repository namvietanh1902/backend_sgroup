const userRouter = require('express').Router()
const { updateMiddleware, validateMiddleware } = require('../middleware/validatorMiddleware')
const authenticateMiddleware = require('../middleware/authenticateMiddleware')
const userController = require("../controllers/userController")
userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/", validateMiddleware, userController.createUser)
userRouter.put("/:id", authenticateMiddleware, updateMiddleware, userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter