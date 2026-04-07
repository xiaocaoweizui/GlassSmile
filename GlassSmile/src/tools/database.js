
// 需要安装 npm install mysql

var mysql = require('mysql')
 // var connection = mysql.createConnection({
 //   host: '10.5.11.155',
 //   port: 3306,
 //   user: 'root',
 //   password: 'Mysoft95938',
 //   database: 'modeling_platform_qdgl',
 //   multipleStatements:true // 允许执行多条SQL语句
 // });
var connection = mysql.createConnection({
  host: 'tj.info.intl-sales.staging.ob.srv',
  port: 2883,
  user: 'intl_sales_st@service#staging_info',
  password: 'lF7xDp7NUiwlKKuMf#rY1BFA#VsFQoF',
  database: 'intl_commission_system_price',
  multipleStatements:true // 允许执行多条SQL语句
});
// 确保在程序退出时关闭连接池
// process.on('exit', () => {
//   pool.end((err) => {
//     if (err) console.error('Error closing connection pool:', err);
//     else console.log('Connection pool closed successfully.');
//   });
// });
//


module.exports = connection;
