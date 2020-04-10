const {encrypt, decrypt, transform,hashed}= require('./crypt.js');

const DB="attendance_cloud_system"
var mongoose = require('mongoose');
const url='mongodb://localhost/'+DB;
const collname='student_signup_details'


var attendance_record = require('..//data//data.json')
var prof_record = require('..//data//Professor.json')

function professorConvertJson(){
	for(var row in prof_record){
		console.log("-----------------------------------------------------------------")
		let enc=transform()
		for(var item in prof_record[row]){
				console.log("Item= "+item+":"+prof_record[row][item])
				if (item=="password"){
					prof_record[row][item]=hashed(prof_record[row][item],enc.salt).hash
				}
				else{
				prof_record[row][item]=encrypt(prof_record[row][item],enc.key)
				}
				prof_record[row]['salt']=enc.salt
		}
		console.log("-----------------------------------------------------------------")
	}
	
	for(var row in prof_record){
		console.log("-----------------------------------------------------------------")
		//let enc=transform()
		for(var item in prof_record[row]){
				console.log("Item= "+item+":"+prof_record[row][item])
				//attendance_record[row][item]=encrypt(attendance_record[row][item],enc.key)
				//attendance_record[row]['salt']=enc.salt
		}
		console.log("-----------------------------------------------------------------")
	}
	
}
//professorConvertJson()

function insertProf(data){
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
	db.collection('collegeProfessor').insertMany(data,function(err,result){
		if (err) throw err;
		console.log("Number of records inserted: " + result.insertedCount);  
		db.close(); 
	});
});
}
//insertProf(prof_record)

function convertJson(){	
	for(var row in attendance_record){
		console.log("-----------------------------------------------------------------")
		let enc=transform()
		//console.log("Attr="+row+": "+attendance_record[row]);
		for(var item in attendance_record[row]){
			//attendance_record[row][item]="xyz"
			
			if(typeof attendance_record[row][item]==='object'){
				for(var innerItem in attendance_record[row]['attendance']){
					//attendance_record[row]['attendance'][innerItem]=innerItem
					console.log("Inner Item= "+innerItem+":"+attendance_record[row]['attendance'][innerItem])
					attendance_record[row]['attendance'][innerItem]=encrypt(attendance_record[row]['attendance'][innerItem],enc.key)
				}
			}
			else{
				console.log("Item= "+item+":"+attendance_record[row][item])
				attendance_record[row][item]=encrypt(attendance_record[row][item],enc.key)
			}
			attendance_record[row]['salt']=enc.salt
		}

		console.log("-----------------------------------------------------------------")
	}

	for(var row in attendance_record){
		//console.log("Attr="+row+": "+attendance_record[row]);
		console.log("-----------------------------------------------------------------")
		for(var item in attendance_record[row]){
			
			console.log("Item= "+item+":"+attendance_record[row][item])
			if(typeof attendance_record[row][item]==='object'){
				for(var innerItem in attendance_record[row]['attendance']){
					//attendance_record[row]['attendance'][innerItem]=innerItem
					console.log("Inner Item= "+innerItem+":"+attendance_record[row]['attendance'][innerItem])
				}
			}
		}
		console.log("-----------------------------------------------------------------")
		
	}
}

function insertStudent(data){
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
	db.collection('collegeStudent').insertMany(data,function(err,result){
		if (err) throw err;
		console.log("Number of records inserted: " + result.insertedCount);  
		db.close(); 
	});
});
}
//insertStudent(attendance_record);

 function find_match(email,password,table){
 mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    var cursor = db.collection(table).find({},{ projection :{ prof_email: 1,prof_password:1 ,salt:1}}
	).toArray(function(err, result) {
    if (err) throw err;
	for (var i=0;i<result.length; i++){
		var buf_email = new Buffer.from(result[i].prof_email.slice(0,24), 'base64');
		var buf_password = new Buffer.from(result[i].prof_password.slice(0,24), 'base64');
		//console.log('iv type: '+buf)
		
		let enc=transform(result[i].salt);
		let cipher=encrypt(prof_email,enc.key,buf);
		//let prof_password=hashed()
		
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

//find_match('Runal Pimpale')

function find_student_match(email,subject,div,date,table){

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

    db.collection(table).find({}).toArray( function(err, result) {
    if (err) throw err;
	
	for (var i=0;i<result.length; i++){
		var buf_email = new Buffer.from(result[i].email.slice(0,24), 'base64');
		var buf_subject = new Buffer.from(result[i].subject.slice(0,24), 'base64');
		var buf_div = new Buffer.from(result[i].div.slice(0,24), 'base64');
		var buf_date = new Buffer.from(result[i].date.slice(0,24), 'base64');
		//var buf_date = new Buffer.from(result[i].date.slice(0,24), 'base64');
		//console.log('iv type: '+buf_subject)
		
		let enc=transform(result[i].salt);
		let cipherEmail=encrypt(email,enc.key,buf_email);
		let cipherSubject=encrypt(subject,enc.key,buf_subject);
		let cipherDiv=encrypt(div,enc.key,buf_div);
		let cipherDate=encrypt(date,enc.key,buf_date);
		//let prof_password=hashed()
		
		if(cipherEmail==result[i].email && cipherSubject==result[i].subject && cipherDiv==result[i].div && cipherDate==result[i].date){
			console.log('Match Found')
			console.log('Encrypted Student Name: '+result[i].email);
			console.log('Decrypted Student Name: '+decrypt(result[i].email,enc.key));
			
			if(typeof result[i].attendance=='object'){
				for(var students in result[i].attendance){
					console.log('Decrypted Student Name: '+decrypt(result[i].attendance[students],enc.key));
					data['rows'].push({name:decrypt(result[i].attendance[students],enc.key), value : 'Present'})

				}
			}
			//console.log('Decrypted Student Name: '+decrypt(result[i].attendance.Student1,enc.key));
			//console.log('Decrypted Student Name: '+decrypt(result[i].email,enc.key));
			
		}
		
	}
	
    db.close();
	return data
  });
});
}

//var x= matching("satish.ket@mctrgit.ac.in","CCL","B","2020-04-01","collegeStudent")
//console.log("Print x=%j",x)
//console.log("rows=%j",data)
//var async=require('async')
//var mongodb=require('mongodb').MongoClient
//var dB= mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
/*const mythings=async function getAThing() {
		let thing={}
    //async mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		await mongodb.connect(url, async function(err,dataB){
			if (err) throw err;
		  var dbo =await dataB.db(DB);
		  dbo.collection("collegeStudent").find({}).toArray( async function(err, result) {
			if (err) throw err;
			console.log(result);
			await dataB.close();
        return thing;
		  });
		});
    //if (await db.authenticate("myuser", "mypassword")) {
        //let thing = await dB.collection("collegeStudent").find({});
        
	//}
//}
}
async function start(){
	let x=await mythings()
	console.log("dta=%j",x)
}
var m=start()
*/
/*
var Server = require("mongo-sync").Server;
var server = new Server('127.0.0.1');
var result = server.db("test").getCollection("posts").find().toArray();
console.log(result);
server.close();
*/
//var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var urli='mongodb://localhost/'+DB;

                 
module.exports = {
	
  FindProfMatch: function(prof_email,password){
	  return MongoClient.connect("mongodb://localhost/").then(function(client){
		  let db=client.db('attendance_cloud_system');
		  var collection=db.collection('collegeProfessor');
		  return collection.find().toArray();
	  }).then(function(result){
		  for(var i=0;i<result.length;i++){
			var buf_email = new Buffer.from(result[i].email.slice(0,24), 'base64');
			const hashed_pass=hashed(password,result[i].salt)
			//var buf_pass = new Buffer.from(result[i].subject.slice(0,24), 'base64');
			let enc=transform(result[i].salt);
			let cipherEmail=encrypt(prof_email,enc.key,buf_email);
			if(cipherEmail==result[i].email && hashed_pass==result[i].password){
				return "1"
			}
			
		  }
		  return "0";
	  });
  }
	
  FindStudentMatch: function(subject,div,date) {
	
    return MongoClient.connect("mongodb://localhost/").then(function(client) {
	let	db = client.db('attendance_cloud_system');
      var collection = db.collection('collegeStudent');
     
      return collection.find().toArray();
    }).then(function(result) {
      var data={}
	  data['rows']=[]
	  for (var i=0;i<result.length; i++){
		var buf_email = new Buffer.from(result[i].email.slice(0,24), 'base64');
		var buf_subject = new Buffer.from(result[i].subject.slice(0,24), 'base64');
		var buf_div = new Buffer.from(result[i].div.slice(0,24), 'base64');
		var buf_date = new Buffer.from(result[i].date.slice(0,24), 'base64');
		let enc=transform(result[i].salt);
		let cipherSubject=encrypt(subject,enc.key,buf_subject);
		let cipherDiv=encrypt(div,enc.key,buf_div);
		let cipherDate=encrypt(date,enc.key,buf_date);
		if( /*cipherEmail==result[i].email &&*/ cipherSubject==result[i].subject && cipherDiv==result[i].div && cipherDate==result[i].date){
			
			console.log('Match Found')
			console.log('Encrypted Student Name: '+result[i].email);
			console.log('Decrypted Student Name: '+decrypt(result[i].email,enc.key));
			
			if(typeof result[i].attendance=='object'){
				for(var students in result[i].attendance){
					console.log('Decrypted Student Name: '+decrypt(result[i].attendance[students],enc.key));
					data['rows'].push({name:decrypt(result[i].attendance[students],enc.key), value : 'Present'})

				}
			}

		}
		
	}
      return data['rows'];
    });
  }
};
