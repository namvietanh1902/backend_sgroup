const {loginSchema,registerSchema,updateSchema} = require('../helpers/joi')
const validateMiddleware = (req, res, next) => {
    const age = req.body.age;
    const fullname = req.body.fullname
    if (!(validateAge(age) && validateName(fullname))) {
        return res.status(400).json({
            "message": "The value is invalid"
        })
    }
    next();

}
const registerMiddleware = (req,res,next)=>{
    registerSchema
    .validateAsync(req.body)
    .then(() => next())
    .catch((err) => {
      return res.status(404).json(err.details);
    });
}
const updateMiddleware= (req,res,next)=>{
    updateSchema
    .validateAsync(req.body)
    .then(() => next())
    .catch((err) => {
      return res.status(404).json(err.details);
    });
}
const loginMiddleware= (req,res,next)=>{
    loginSchema
    .validateAsync(req.body)
    .then(() => next())
    .catch((err) => {
      return res.status(404).json(err.details);
    });
}
module.exports = {
    validateMiddleware,
    registerMiddleware,
    updateMiddleware,
    loginMiddleware
}