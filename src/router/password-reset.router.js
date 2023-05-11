const router = require('express').Router()
//const {updateMiddleware,validateMiddleware} = require('../middleware/validatorMiddleware')
//const authenticateMiddleware= require('../middleware/authenticateMiddleware')

const resetController = require("../controllers/password-reset.controller")
router.post('/', resetController.sendResetMail)
router.post('/refresh', resetController.resetPassword)
module.exports = router