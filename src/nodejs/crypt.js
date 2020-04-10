'use strict';

const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
//console.log('KEY :'+ENCRYPTION_KEY)
function hashed(password,salts=''){
	let salt=0
	if(salts==''){
		salt= crypto.randomBytes(20).toString('base64');
	}
	else{
		salt=salts
	}
	const iterations=10000;
	let hash=crypto.pbkdf2Sync(password, salt, iterations,128, 'sha512').toString('base64');
	//console.log('hash: '+hash)
	return {
		salt: salt,
        hash: hash,	
	}
}


function transform(salts=''){
	let salt=0
	if(salts==''){
		salt= crypto.randomBytes(20).toString('base64');
	}
	else{
		salt=salts
	}
	const iterations=10000;
	//console.log('Salts: '+ENCRYPTION_KEY );

	let hash=crypto.pbkdf2Sync(ENCRYPTION_KEY, salt, iterations,24, 'sha512').toString('base64');
	//console.log('hash: '+hash)
	return {
		salt: salt,
        key: hash,	
	}
}

function encrypt(text,key,iv='') {
 if (iv==''){
	 iv = crypto.randomBytes(IV_LENGTH);
 }
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return iv.toString('base64') + encrypted.toString('base64');

}

function decrypt(text,key) {
 var textIV=text.slice(0,24);
 var textEnc=text.slice(24,);
 let textParts=[textIV,textEnc];
 let iv = Buffer.from(textParts.shift(), 'base64');
 let encryptedText = Buffer.from(textParts.join(''), 'base64');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

module.exports = { decrypt, encrypt, transform};