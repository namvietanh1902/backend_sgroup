const router = require('express').Router()
//const {updateMiddleware,validateMiddleware} = require('../middleware/validatorMiddleware')
//const authenticateMiddleware= require('../middleware/authenticateMiddleware')

const resetController = require("../controllers/password-reset.controller")
router.get('/', resetController.sendResetMail)
router.post('/:token', resetController.resetPassword)
module.exports = router