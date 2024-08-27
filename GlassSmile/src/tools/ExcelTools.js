const XLSX = require('xlsx');
const fs = require('fs');

//读取 excel
const workbook = XLSX.read(fs.readFileSync('data.xlsx'), { type: 'buffer' });

// 获取工作表名称
//let sheetNames= workbook.SheetNames;
const sheetName = 'Sheet1'; // 要读取的工作表的名称
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

console.log(data.length);
for(var i=0;i<data.length;i++){
  var row =data[i];
  var code2=row.code2;
  for(var j=0;j<data.length;j++) {
    var row2 = data[j];
    if(row2.code==code2){
      row.result=row2.name;
  }
  }
}
console.log(data);
const worksheet =XLSX.utils.json_to_sheet(data);

// 创建工作簿
const retWorkbook = XLSX.utils.book_new();

// // 创建工作表数据
// const worksheet_data = [
//   ["姓名", "年龄", "职业"],
//   ["Alice", 28, "Engineer"],
//   ["Bob", 22, "Designer"],
//   ["Charlie", 32, "Manager"]
// ];
//
// // 将数据转换为工作表
// const worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

// 将工作表添加到工作簿
XLSX.utils.book_append_sheet(retWorkbook, worksheet, "Sheet1");
// 写入文件
XLSX.writeFile(retWorkbook, "output.xlsx");
