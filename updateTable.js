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
    },
    UpdateExpression: "set info.phone = :p, info.city = :c, info.USState = :s",
    ExpressionAttributeValues:{
        ":p":"111-111-1111",
        ":c":"Buffalo",
        ":s":"New York"
    },
    ReturnValues:"UPDATED_NEW"
};



doc.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});