const express = require('express') 
var fs = require('fs');

const app =express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 app.get('/',function(req,res){

    const readXlsxFile = require('read-excel-file/node');
 
    readXlsxFile(fs.createReadStream('..//data//Professor.xlsx')).then((rows) => {
        res.send(rows)

    })
    
    // res.send('123456');

})

app.listen(3000,function(){
   
    console.log("working");
    
})





