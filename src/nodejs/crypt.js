'use strict';

const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
//console.log('KEY :'+ENCRYPTION_KEY)

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
 //console.log('Encryption key: '+key);
 if (iv==''){
	 iv = crypto.randomBytes(IV_LENGTH);
	 //var buf = new Buffer(iv, 'byte');
	 //console.log('iv type: '+iv)
 }
 
 //console.log('IV: '+iv.toString('base64'));
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);
 //console.log('IV: '+iv.toString('base64') +'Encrypted: '+ encrypted.toString('base64'))
 return iv.toString('base64') + encrypted.toString('base64');

}

function decrypt(text,key) {
 //var salting=transform(salt);
 //var key=salting.key;
 //console.log('Decryption key: '+key);
 var textIV=text.slice(0,24);
 //console.log('Text_IV: '+key);
 //console.log('Text_Value: '+text.slice(24,));
 var textEnc=text.slice(24,);
 //let textParts = text.split(':');
 //console.log("IV !-"+textParts);
 let textParts=[textIV,textEnc];
 let iv = Buffer.from(textParts.shift(), 'base64');
 //console.log('IV- '+iv.toString('base64'))
 let encryptedText = Buffer.from(textParts.join(''), 'base64');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

//Piyush@Singh@Pasi@Umesh@Chandra
//var after_salt=adding_salt(ENCRYPTION_KEY);
//console.log('salt :'+after_salt.salt+' hash :'+after_salt.hash)
//var enc=transform()
//var name=encrypt('Runal Pimpale','1rCi73cQmKNO74h1/B8DMfqN0AqkrFz9');
//console.log('Encrypted :'+transform('').salt);
//console.log('Encrypted :'+name);
//console.log('Decryted :'+decrypt(name,enc.salt))
//var temp='2+qPo/lXiYvN14qIinT3pQ==JGb3FmVkseGcDqX8mTm2HA=='
//var sal='KJdrISheorm9Cq4/bDR2CAtmRH4='
//console.log('Decrypted Manually:'+decrypt(temp,sal));
//console.log('xC6lbcjluAo0n3OZnNniQ5NBgC4='.toString('base64'))
module.exports = { decrypt, encrypt, transform};