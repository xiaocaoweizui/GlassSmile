

const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.read(fs.readFileSync('data.xlsx'), { type: 'buffer' });

const sheetName = 'Sheet1'; // 要读取的工作表的名称
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// console.log(`Sheet: ${sheetName}`);
// console.log(data);

var strBuilder=[];

var rowCount=1;
data.forEach(row => {

  let sql="";
  // 客户的sql
  //        sql= `
  //  DELETE FROM intl_rebate_boc_price_model where customer_id='${row.customer_id}' and sale_model='${row.sale_model}' and ram='${row.ram}' and rom='${row.rom}';
  //  INSERT INTO intl_rebate_boc_price_model (customer_id, customer_name, sale_model, ram, rom, sip, single_create_amount)
  //  VALUES ('${row.customer_id}', '${row.customer_name}', '${row.sale_model}', '${row.ram}', '${row.rom}', ${row.sip}, ${row.single_create_amount});`

  //金额格式sql
   sql=`

    DELETE from intl_rebate_boc_user_amount_format where user_account='${row.user_account}';
    insert into intl_rebate_boc_user_amount_format (user_account,user_name,amount_format) VALUES ('${row.user_account}','${row.user_name}','${row.amount_format}');`

        strBuilder.push(sql)
})

var combineSQL=strBuilder.join(' \n ');



try {
  fs.writeFileSync('sql.sql', combineSQL, 'utf8');
  console.log('文件同步写入成功');
} catch (err) {
  console.error('写入文件出错:', err);
}
