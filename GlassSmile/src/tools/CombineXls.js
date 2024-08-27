
// 参看一下：https://www.jb51.net/javascript/303193ydb.htm
const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.read(fs.readFileSync('data.xlsx'), { type: 'buffer' });

const sheetName = 'Sheet1'; // 要读取的工作表的名称
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// console.log(`Sheet: ${sheetName}`);
// console.log(data);
let sheetNames= workbook.SheetNames;

console.log(sheetNames);

const workbookresult = XLSX.read(fs.readFileSync('result.xlsx'), { type: 'buffer' });

var strBuilder=[];
 data.forEach(row => strBuilder.push(row.code));
sheetNames.forEach(sheetName => {

    let sheet = workbook.Sheets[sheetName];
    let data = XLSX.utils.sheet_to_json(sheet);
    console.log(data);
    workbookresult.Sheets[sheetName]=XLSX.utils.json_to_sheet(data);
  // workbookresult.Sheets[sheetName]=XLSX.utils.json_to_sheet(data.filter(row => strBuilder.includes(row.code)));

})

