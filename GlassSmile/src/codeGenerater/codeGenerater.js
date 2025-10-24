const fs = require('fs');
var cnn = require('../tools/database.js');
var codeTools = require('./codeTools');

var param = {
  tableName: 'price_data_dict',
  entityName: 'PriceDataDict'
}
var querySQL = `SELECT COLUMN_NAME,
                       DATA_TYPE,
                       IS_NULLABLE,
                       COLUMN_DEFAULT,
                       COLUMN_COMMENT
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_NAME = '${param.tableName}'
                ORDER BY ORDINAL_POSITION;`



//1、写mapper文件
fs.readFile('mapper.java', 'utf8', function (err, data) {
  if (err) {
    console.error('读取文件出错:', err)
    return
  }
  const result = data.replace(/{{EntityName}}/g, param.tableName)
  console.log('当前工作目录:', process.cwd());
  const path = require('path');
  const dir = path.join(process.cwd(), 'code');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let fileName = `./code/${param.entityName}Mapper.java`;
  console.log(fileName);
  fs.writeFile(fileName, result, 'utf8', function (err) {
    if (err) {
      console.error('写入文件出错:', err)
    } else {
      console.log('文件写入成功')
    }
  })
})
//
// //2、写DO文件
// cnn.connect();
// cnn.query(querySQL, function (err, result) {
//   if (!Array.isArray(result)) {
//     console.error('查询结果不是有效数组:', result);
//     return;
//   }
//   //1、构造代码段
//   var strBuilder = [];
//   for (let i = 0; i < result.length; i++) {
//     let row = result[i];
//     let javaName = codeTools.toJavaName(row.COLUMN_NAME)
//     let javaType = codeTools.toJavaType(row.DATA_TYPE)
//     let tableField = `@TableField("${row.COLUMN_NAME}")`
//     //主键为常量id
//     if (javaName === 'id') {
//       tableField = `@TableId(type = IdType.AUTO)`
//     }
//     let str = `
//     /**
//      * ${row.COLUMN_COMMENT}
//      */
//     ${tableField}
//     private ${javaType} ${javaName};
//     `
//     strBuilder.push(str)
//   }
//
//   fs.readFile('DO.java', 'utf8', function (err, data) {
//     if (err) {
//       console.error('读取文件出错:', err)
//       return
//     }
//     const result = data.replace(/{{entityName}}/g, param.entityName).replace(/{{tableName}}/g, param.tableName).replace(/{{fields}}/g, strBuilder.join('\n'));
//     fs.writeFile(`./code/${param.entityName}DO.java`, result, 'utf8', function (err) {
//       if (err) {
//         console.error('写入文件出错:', err)
//       } else {
//         console.log('文件写入成功')
//       }
//     })
//   })
// })

cnn.end()
