var express = require('express');
var router = express.Router();
var fs = require('fs');

//Temp Global Variable
var files = new Array();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploadFile', function (req,res,next){
   res.render('uploadFile'); 
});

router.post('/uploadFile', function (req,res,next){
   //File had been uploaded
   
   console.log(req.files[0].filename);
   
   req.files[0]._id = Date.now();
   
   console.log(req.files[0]);
   
   files.push(req.files[0]);
   
   console.log(req.files[0].size); 
   res.redirect('/files');
});

router.get('/files', function(req,res,next){
    res.render('test', {theFiles: files});
});

router.get('/test', function (req,res,next){
   res.render('test'); 
});

router.get('/deleteFile/:fileID', function(req,res,next){
    console.log("Just testing to delete " + req.params.fileID);
    
    for (var x = 0; x < files.length; x++){
        if (files[x]._id == req.params.fileID){
            //We got a match
            fs.unlink('./uploads/' + files[x].filename, function (error){
                //Do nothing
            });
            files.splice(x,1);
            break;
        }
    }
    
    res.redirect('/files')
});

module.exports = router;
