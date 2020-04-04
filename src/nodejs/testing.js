var mongoose=require('mongoose')
/*
mongoose.createConnection("mongodb://localhost/attendance_cloud_system")
.then(async db => {
    const collection = db.collection("collegeStudent");
    const all = collection.find({});

    while(all.hasNext()) {
        let chemical = await all.next();
        await work(chemical);
    }
})


const work = (chemical) => new Promise((resolve, reject) => {
    const casNumber = chemical.email;
    analysis(casNumber, (error) => {
        error ? reject(error) : resolve(casNumber);
    })
});*/
//var MongoClient=require('mongodb').MongoClient
/*
async function functionOne(email) {
	const client = await MongoClient.connect("mongodb://localhost/");
	const db = client.db('attendance_cloud_system'); // No await here, because it returns a Db instance.
	//const collection = db.collection('collegeStudent');
  // Returns a Collection instance, not a Promise, so no need for await.
  const collection = db.collection('collegeStudent');

  // Without a callback, toArray() returns a Promise.
  // Because our functionOne is an "async" function, you do not need "await" for the return value.
  return collection.find({}).toArray();
}

var m=functionOne('fgj')
console.log(m)*/

'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// db url
var url = 'mongodb://localhost/';
/*
async function main(){
 let client, db;
 try{
    client = await MongoClient.connect(url, {useNewUrlParser: true,});
    db = client.db('attendance_cloud_system');
    let dCollection = db.collection('collegeStudent');
    let result = await dCollection.find({});   
    // let result = await dCollection.countDocuments();
    // your other codes ....
	console.log(result.toArray())
    return result.toArray();
 }
 catch(err){ console.error(err); } // catch any mongo error here
 finally{ client.close(); } // make sure to close your connection after
}
var x= main()
console.log("data=%j",x)
*/
var db1 = require('./insertInDB.js')
 var subject="CCL"
var div="B"
var date="2020-04-02"     
db1.FindStudentMatch(subject,div,date).then(function(items) {
  console.info('The promise was fulfilled with items!', items);
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});