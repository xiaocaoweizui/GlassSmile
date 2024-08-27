var cnn = require("./database.js");
cnn.connect();

var querySQL="select UserName,`Password` from myUser";
cnn.query(querySQL, function (err, result) {
  console.log(result)
})


cnn.end();
