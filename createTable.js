var AWS = require("aws-sdk");
AWS.config.update({
    region:"us-east-1",
  //  endpoint:"127.0.0.1:8000"
});


var db= new AWS.DynamoDB();



var parms = {
    TableName:"TestDB",
    KeySchema: [ 
        {AttributeName: "UserID", KeyType: "HASH"},
        {AttributeName: "Username", KeyType: "RANGE"},

    ],
    AttributeDefinitions: [
        {AttributeName: "UserID", AttributeType:"N"},
        {AttributeName: "Username", AttributeType:"S"},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits:1,
        WriteCapacityUnits:1
    }

};

var createTableCall = db.createTable(parms, function(err, data){
    if(err) {
        console.error("it pooped", JSON.stringify(err, null ,2));
    }
    else {
        console.log("it worked", JSON.stringify(data,null,2));
    }

}).promise();

createTableCall.then(
    function(data){

        console.log("table has been created");
    }
);