var AWS = require("aws-sdk");


AWS.config.update({
    region:"us-east-1",
  //  endpoint:"127.0.0.1:8000"
});


var doc = new AWS.DynamoDB.DocumentClient();


var table = "TestDB";

var UserID = 2;
var Username="flimmyflam";

var params = {
    TableName: table,
    Key:{
        "UserID": UserID,
        "Username": Username
    }
};


doc.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
