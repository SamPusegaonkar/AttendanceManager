const express = require('express') 
const app = express()

'use strict';

const fs = require('fs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  const data = require('..//data//data.json')

app.get('http://localhost:3002/', (req, res) => console.log(res))

app.listen(3002,function(){
    console.log(data);
});





