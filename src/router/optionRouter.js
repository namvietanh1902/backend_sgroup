const optionRouter = require('express').Router();
module.exports = optionRouter;
const optionController = require("../controllers/optionController");
optionRouter.post("/", optionController.addOption);
optionRouter.put("/:optionId", optionController.editOption);
optionRouter.delete("/:optionId", optionController.removeOption);
