const mailService = require('./mailService')
const userService = require('./userService')
const { createHash } = require('../helpers/hash')
const sendResetMail = async (email) => {
    const user = await userService.getUserByEmail(email);

    if (user) {
        const secret = new Date().toDateString()
        const token = createHash(user.salt, secret);
        const tokenUpdated = await userService.updateToken(user, token);
        if (tokenUpdated) {
            const content =
                `
                <p>Username: ${user.username}</p>
                <p>Reset password token: ${token} </p>
            `
            const mailSent = await mailService.sendEmail(user.email, "Password Reset Token", content);
            console.log(mailSent)
            return mailSent;
        }

    }
    return false;
}
const resetPassword = async (token, password) => {
    const user = await userService.getUserByToken(token);
    console.log(user);
    if (user) {
        const hashedPassword = createHash(user.salt, password)
        const isPasswordReset = await userService.resetPassword(hashedPassword, user);
        return isPasswordReset;
    }
    return false;
}
module.exports = {
    sendResetMail,
    resetPassword
}