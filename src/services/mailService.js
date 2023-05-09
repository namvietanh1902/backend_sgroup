const nodemailer = require('nodemailer');
const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,

        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },


    });
    let isSend = await transporter.sendMail({
        from: 'sgroup@gmail.com',
        to: email,
        subject: subject,
        text: text,
    }).then(() => {
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
    return isSend;

}
module.exports = {
    sendEmail
}