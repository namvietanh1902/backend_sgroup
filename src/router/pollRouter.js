const pollRouter = require('express').Router()
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const pollController = require("../controllers/pollController");

const optionController = require("../controllers/optionController");

pollRouter.post("/", authenticateMiddleware, pollController.createPoll);
pollRouter.post("/submit/:id", authenticateMiddleware, pollController.submitOption);
pollRouter.post("/unsubmit/:id", authenticateMiddleware, pollController.unsubmitOption);

pollRouter.get("/:id", pollController.getPollDetail)
pollRouter.post("/:id/options/", authenticateMiddleware, optionController.addOption);
pollRouter.put("/:id/options/:optionId", authenticateMiddleware, optionController.editOption);
pollRouter.delete("/:id/options/:optionId", authenticateMiddleware, optionController.removeOption);
module.exports = pollRouter;
