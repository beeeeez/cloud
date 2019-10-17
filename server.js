var AWS = require("aws-sdk");
var fs = require('fs');
var file = "index.html"
var file2 = "error.html"
/*
AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  //get creds d00d
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});*/

var bName = "jimmy-jammy-whammy";


var staticHostParams = {
  Bucket: 'jimmy-jammy-whammy',
  WebsiteConfiguration: {
    ErrorDocument: {
      Key: 'error.html'
    },
    IndexDocument: {
      Suffix: 'index.html'
    },
  }
};

var fileStream = fs.createReadStream(file);
fileStream.on('error', function (err) {
  console.log('File Error', err);
});

var fileStream2 = fs.createReadStream(file2);
fileStream.on('error', function (err) {
  console.log('File Error', err);
});


var bPromise = new AWS.S3().createBucket({ ACL:"public-read",Bucket: bName }).promise();

bPromise.then(
  function (data) {
    console.log("created bucket")
    var parm = {ACL: "public-read", Bucket: bName, Key: "index.html", Body: fileStream };
    var upProm = new AWS.S3().putObject(parm).promise();
    upProm.then(
      function (data) {
        console.log("uploaded object");
        var parm2 = { ACL: "public-read", Bucket: bName, Key: "error.html", Body: fileStream2 };
        var upProm2 = new AWS.S3().putObject(parm2).promise();
        upProm2.then(function (data) {
          console.log("uploaded object");
          var listOb = new AWS.S3().listObjects({ Bucket: bName, MaxKeys: 2 }).promise();
          listOb.then(function (data) {


            console.log("! listing objects ! " + JSON.stringify(data));
            data.Contents.values()
            var webSetup = new AWS.S3().putBucketWebsite(staticHostParams, function (err, data) {

              if (err) {
                // display error message
                console.log("Error", err);
              } else {
                // update the displayed website configuration for the selected bucket
                console.log("Success", data);
              }
              



            });
          });

          //    var obDel = new AWS.S3().deleteObject({Bucket:bName, Key:"johnMad.jpg"}).promise();
          // obDel.then(function(data){       

          //   console.log("deleted object")
          // var bDel = new AWS.S3().deleteBucket({Bucket: bName}).promise();

          // bDel.then(function(data){
          //     console.log("deleted bucket");
          //  }).catch(function(err){
          //       console.log(err);
          //    });
          //  }).catch(function(err){console.log(err)});



        });
      });


  }).catch(function (err) {
    console.log(err, err.stack);
  })











