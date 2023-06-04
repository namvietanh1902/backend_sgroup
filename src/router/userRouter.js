const userRouter = require('express').Router()
const { updateMiddleware, validateMiddleware, registerMiddleware } = require('../middleware/validatorMiddleware')
const authenticateMiddleware = require('../middleware/authenticateMiddleware')
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")
userRouter.get("/search", userController.searchUser)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/", authenticateMiddleware, registerMiddleware, authController.register)
userRouter.put("/:id", authenticateMiddleware, updateMiddleware, userController.updateUser)
userRouter.delete("/:id", authenticateMiddleware, userController.deleteUser)
userRouter.get("/", userController.getAllUsers);

module.exports = userRouter