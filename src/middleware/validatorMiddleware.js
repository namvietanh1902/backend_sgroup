const validateMiddleware = (req, res, next) => {
    const age = req.body.age;
    const fullname = req.body.fullname
    if (!(validateAge(age) && validateName(fullname))) {
        return res.status(400).json({
            "message": "The value is invalid"
        })
    }
    next()

}
const validateAge = (age) => {
    return age > 0;
}
const validateName = (fullname) => {
    let regex = /^[a-zA-Z ]+$/
    return regex.test(fullname)
}
module.exports = validateMiddleware