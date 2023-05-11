const resetService = require('../services/password-reset.service')
const sendResetMail = async (req, res) => {
    const email = req.body.email;
    const sent = await resetService.sendResetMail(email);
    if (sent) {
        return res.status(200).json({
            message: "Send mail successfully"
        });
    }
    return res.status(400).json({
        message: "Send mail failed"
    });
}
const resetPassword = async (req, res) => {
    const { password, token } = req.body;
    const isReset = await resetService.resetPassword(token, password);
    if (isReset) {
        return res.status(200).json({
            message: "Reset Password Successfully"
        });
    }
    return res.status(401).json({
        message: "Reset Password Failed"
    });

}
module.exports = {
    sendResetMail,
    resetPassword
}