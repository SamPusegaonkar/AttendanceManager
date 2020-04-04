const {encrypt, decrypt, transform}= require('./crypt.js');

const DB="attendance_cloud_system"
var mongoose = require('mongoose');
const url='mongodb://localhost/'+DB;
const collname='student_signup_details'
const name='Pasi Piyush Singh Umesh Chandra'
function find_match(value){
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    var cursor = db.collection(collname).find({},{ projection :{ student_name: 1, salt:1}}
	).toArray(function(err, result) {
    if (err) throw err;
	for (var i=0;i<result.length; i++){
		var buf = new Buffer.from(result[i].student_name.slice(0,24), 'base64');
		//console.log('iv type: '+buf)
		
		let enc=transform(result[i].salt);
		let cipher=encrypt(value,enc.key,buf);
		

		if(cipher==result[i].student_name){
			console.log('Match Found')
			console.log('Encrypted Student Name: '+result[i].student_name);
			console.log('Decrypted Student Name: '+decrypt(result[i].student_name,enc.key));
		}
		
	}

    db.close();
  });
}); 
}

find_match('Runal Pimpale')