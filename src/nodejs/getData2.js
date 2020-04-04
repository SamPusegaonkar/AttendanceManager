const express = require('express') 
var bodyParser = require('body-parser')



const app_professor =express()
const app_student = express()
const app_send_attendance_record = express()
const app_save_attendance_record = express()

'use strict';
app_professor.use(bodyParser.urlencoded({ extended: false }))
app_professor.use(bodyParser.json())
app_professor.use(express.static('public'));

app_student.use(bodyParser.urlencoded({ extended: false }))
app_student.use(bodyParser.json())
app_student.use(express.static('public'));

app_send_attendance_record.use(bodyParser.urlencoded({ extended: false }))
app_send_attendance_record.use(bodyParser.json())
app_send_attendance_record.use(express.static('public'));

app_save_attendance_record.use(bodyParser.urlencoded({ extended: false }))
app_save_attendance_record.use(bodyParser.json())
app_save_attendance_record.use(express.static('public'));

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

app_send_attendance_record.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
next();
});

app_save_attendance_record.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
    });

app_professor.post('/',function(req,res){
    
    const professor_data = require('..//data//Professor.json')
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
    const student_data = require('..//data//Students2020.json')
    var i,counter=0;
    // console.log(req.body);
    for(i=0;i<student_data.length;i++){
          if(student_data[i].id==req.body['data'].id){ 
            res.json({id:student_data[i].id,name:student_data[i].name,rollno:student_data[i].rollno, div:student_data[i].div})
            break
          }
    }

});

app_send_attendance_record.post('/',function(req,res){
    var i,data={};
    
    const attendance_record = require('..//data//data.json')
    data['header']=[];
    data['rows']=[];
    // console.log(req.body);
    for( i=0; i<attendance_record.length; i++){
        if(attendance_record[i].subject==req.body['data'].subject && attendance_record[i].div==req.body['data'].div && attendance_record[i].date==req.body['data'].date){
            data['header'].push({text:attendance_record[i].date,value: 'value'});
            for (var key in attendance_record[i].attendance){
                data['rows'].push({name:key, value : attendance_record[i].attendance[key]})
            }
        }
    }
    res.json(data);
});

app_save_attendance_record.post('/',function(req,res){
    
    // console.log(req.body['data']);
    var fs = require('fs')
    // res.send(1);
    fs.readFile('..//data//data.json', function (err, data) {
        var json = JSON.parse(data);
        json.push(req.body['data']);    
        fs.writeFile("..//data//data.json", JSON.stringify(json), function(err){
          if (err) throw err;
        //   console.log('The "data to append" was appended to file!');
        });
    })

});
    


app_professor.listen(3000,function(){
    console.log("Professor data @ 3000");
});

app_student.listen(3001,function(){
    console.log("Student data @ 3001");
});

app_send_attendance_record.listen(3002,function(){
    console.log("Obtaining Attendance data @ 3002");
});

app_save_attendance_record.listen(3003,function(){
    console.log("Saving Attendance data @ 3003");
});