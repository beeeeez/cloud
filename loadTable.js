var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region:"us-east-1",
  //  endpoint:"127.0.0.1:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("doing the thing");

var allUsers=JSON.parse(fs.readFileSync('users.json','utf8'));
allUsers.forEach(function(user) {
    console.log(user.UserID)
      var parms = {
      TableName:"TestDB",
      Item: {
        "UserID":user.UserID,
        "Username":user.Username,
        "info":user.info
      }
    };
    docClient.put(parms, function(err,data){
      if(err){
        console.error("it pooped",JSON.stringify(err,null,2));
      }
      else{
        console.log("added "+user.UserID);
      }

    });

});