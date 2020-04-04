const express = require('express') 
var bodyParser = require('body-parser')
const fs = require('fs');

const student_data = require('..//data//Students2020.json')
const attendance_record = require('..//data//data.json')
const professor_data = require('..//data//Professor.json')

const app_professor =express()
const app_student = express()
const app_attendance_record = express()

'use strict';
app_professor.use(bodyParser.urlencoded({ extended: false }))
app_professor.use(bodyParser.json())
app_professor.use(express.static('public'));

app_student.use(bodyParser.urlencoded({ extended: false }))
app_student.use(bodyParser.json())
app_student.use(express.static('public'));

app_attendance_record.use(bodyParser.urlencoded({ extended: false }))
app_attendance_record.use(bodyParser.json())
app_attendance_record.use(express.static('public'));

app_professor.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

app_student.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
next();
});

app_attendance_record.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
next();
});

app_professor.post('/',function(req,res){
    var i,counter=0;
    for(i=0;i<professor_data.length;i++){
        if(req.body['data'].prof_email==professor_data[i].email  &&  req.body['data'].password==professor_data[i].password) {
            counter=1;
            res.send('1');
            // console.log("Successfull");
            // console.log("1 Pushed");    
            break
        }
    }
    if(counter==0){
        // console.log("Failed");
		counter=0;
        res.send('0');
        // console.log("0 pushed");

    }

});

app_student.post('/',function(req,res){
    var i,counter=0;
    // console.log(req.body);
    for(i=0;i<student_data.length;i++){
          if(student_data[i].id==req.body['data'].id){ 
            res.json({id:student_data[i].id,name:student_data[i].name,rollno:student_data[i].rollno, div:student_data[i].div})
            break
          }
    }

});
var mongoose=require('mongoose');
const {encrypt, decrypt, transform}= require('./crypt.js');

const DB="attendance_cloud_system"
var mongoose = require('mongoose');
const url='mongodb://localhost/'+DB;
app_attendance_record.post('/',function(req,res){
    var i,data={};
    data['header']=[];
    data['rows']=[];
	data['header'].push({text:req.body['data'].date,value: 'value'});
    var db1 = require('./insertInDB.js')
    
	db1.FindStudentMatch(req.body['data'].subject,req.body['data'].div,req.body['data'].date).then(function(items) {
	  console.info('The promise was fulfilled with items!', items);
	  data['rows']=items
	  console.log("%j",data)
	  res.json(data);
	}, function(err) {
	  console.error('The promise was rejected', err, err.stack);
	});

});
app_professor.listen(3000,function(){
    console.log("Professor data @ 3000");
});

app_student.listen(3001,function(){
    console.log("Student data @ 3001");
});

app_attendance_record.listen(3002,function(){
    console.log("Attendance data @ 3002");
});







