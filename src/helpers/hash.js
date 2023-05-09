const crypto = require('crypto');
const hashPassword = (input) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(
        input,
        salt,
        1000,
        64,
        'sha1'
    ).toString('hex');
    return {
        salt,
        hashedPassword
    }
}
const createHash = (salt, input) => {
    const hashedInput = crypto.pbkdf2Sync(
        input,
        salt,
        1000,
        64,
        'sha1'
    ).toString('hex');
    return hashedInput;
}
module.exports = {
    hashPassword,
    createHash
};