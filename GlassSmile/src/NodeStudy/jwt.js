var jwt = require('jsonwebtoken');
const  SECRET_KEY = 'xiaocaoweizui04';
var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTcxNDQ2NzI0OCwiZXhwIjoxNzE0NDcwODQ4fQ.raby74XdSaYkaEY8Rupz-UhkNgYF2CR8Cjus408coCY'
let decode = jwt.verify(token,SECRET_KEY);
console.log(decode);
