
/*
参考地址：
https://geek-docs.com/mysql/mysql-ask-answer/635_mysql_what_is_the_most_maturestable_mysql_nodejs_module.html

首先需要安装：  npm install mysql2
*/
const mysql = require('mysql2/promise');

const config = {
  host: '10.20.32.35',
  port:'9001',
  user: 'root',
  password: '95938',
  database: 'saasmerge'
};

async function run() {
  const connection = await mysql.createConnection(config);

  const [rows, fields] = await connection.execute('SELECT tenantcode from tenant');

  console.log('The tenantcode is: ', rows[0].tenantcode);
}

run();
