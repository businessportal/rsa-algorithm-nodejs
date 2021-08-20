const message = process.argv.slice(2);
console.log('message: ', message[0]);

const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

console.log("public key:");
const publicKeyout = publicKey.export({
    format: 'pem',
    type: 'spki'
});
console.log(publicKeyout);
console.log("Private key:");
const privateKeyout = privateKey.export({
    format: 'pem',
    type: 'pkcs8'
});
console.log(privateKeyout);

const data = message[0];

const encryptedData = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(data)
);
console.log("encypted data: ", encryptedData.toString("base64"));
