const crypto = require('crypto');
const pwd = 'aloha';
const hashWithSHA512 =(input)=>{
    return crypto.createHash('sha512')
                .update(input)
                .digest('hex');
}
const hashWithRandomSalt =(input)=>{
    const salt = crypto.randomBytes(16).toString('hex');
    const output = crypto.pbkdf2Sync(
        input,
        salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
    return output;
}
const key = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const publickey = key.publicKey;
const privatekey = key.privateKey;

const encryptedData = crypto
  .publicEncrypt(
    {
      key: publickey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(pwd)
  )
  .toString("base64");

const decrytdedData = crypto.privateDecrypt(
  {
    key: privatekey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(encryptedData,'base64')
);

console.log(decrytdedData.toString());

// const hashedPassword = hashWithRandomSalt(rawPassword);
// console.log("Hashed Password: ", hashedPassword);