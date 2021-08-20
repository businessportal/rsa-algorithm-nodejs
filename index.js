const message = process.argv.slice(2);

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
console.log('message: ', data);
const encryptedData = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(data)
);
console.log("Encypted data: ", encryptedData.toString("base64"));

const dencryptedData = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  encryptedData
);
console.log("Dencypted data: ", dencryptedData.toString());
