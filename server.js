'use strict';


var express = require('express');
var moment = require('moment');
var path = require('path')

var app = express();

app.get('/',function(req, res) {
    var indexFile = path.join(__dirname, 'public/index.html')
    res.sendFile(indexFile,function(err){
        if(err)
          console.log(err)
    })
}) 


app.get('/:date',function(req,res){
     var jsonResponse;
  
    if(/^\d{8,}$/.test(req.params.date)){
         jsonResponse =  moment(req.params.date,'X');
    } else {
         jsonResponse =  moment(req.params.date,'MMMM D, YYYY');
    }
    
    if(jsonResponse.isValid()){
        
         res.json({
            unix:jsonResponse.format('X'),
            natural: jsonResponse.format('MMMM D, YYYY')
        });
        
    } else{
        
        res.json({
            unix:null,
            natural: null
        })
        
    }

})


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});