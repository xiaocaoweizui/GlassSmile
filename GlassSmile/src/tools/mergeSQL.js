const XLSX = require('xlsx')
const fs = require('fs')

const workbook = XLSX.read(fs.readFileSync('data.xlsx'), {type: 'buffer'})
var strBuilder = []
var countryId = 'CL'
var countryName = '智利'

// 商商关系
var sheetName = 'Sheet1' // 要读取的工作表的名称
var sheet = workbook.Sheets[sheetName]
var data = XLSX.utils.sheet_to_json(sheet)

let sqlSsgx = ' use intl_commission_system_price; \n '
sqlSsgx += `DELETE FROM \`config_customer_relationship\` where country_id = "${countryId}";  \n `
sqlSsgx += `INSERT INTO \`config_customer_relationship\` (\`country_id\`, \`customer_id\`, \`downstream_customer_id\`, \`downstream_customer_name\`, \`is_active\`, \`create_user\`, \`create_time\`, \`update_user\`, \`update_time\`) VALUES`
strBuilder = []
strBuilder.push(sqlSsgx)
data.forEach(row => {
  var isActive = row.活跃状态 == '活跃' ? '1' : '0'
  var sql = `("${countryId}","${row.上游客户编码}","${row.下游客户编码}","${row.下游客户名称}","${isActive}","SYSTEM",1773998601000,"SYSTEM",1773998601000),`
  strBuilder.push(sql)
})

var combineSQL = strBuilder.join(' \n ')
//去掉尾部的，增加分号
combineSQL = combineSQL.substring(0, combineSQL.length - 1) + ';'

try {
  fs.writeFileSync('商商关系.sql', combineSQL, 'utf8')
  console.log('文件同步写入成功')
} catch (err) {
  console.error('写入文件出错:', err)
}

//活跃客户
sheetName = 'Sheet2' // 要读取的工作表的名称
sheet = workbook.Sheets[sheetName]
data = XLSX.utils.sheet_to_json(sheet)
strBuilder = []
let sqlhyke = ' use intl_commission_system_price; \n '
sqlhyke += `INSERT INTO \`config_trade_customer\` (\`country_id\`, \`country_name\`, \`customer_id\`, \`customer_name\`,\`customer_type\`, \`price_model_code\`,\`is_active\`, \`sap_id\`, \`create_user\`, \`create_time\`,\`update_user\`, \`update_time\`) VALUES`
strBuilder.push(sqlhyke)
data.forEach(row => {
  var pricemodelcode = row.模拟器录入类型 == '直供' ? 'Direct_Supply' : ''
  if (row.模拟器录入类型 == '直供') {
    pricemodelcode = '["Direct_Supply"]'
  } else if (row.模拟器录入类型 == 'FD+KA') {
    pricemodelcode = '["FD_KA"]'
  } else if (row.模拟器录入类型 == 'FSD') {
    pricemodelcode = '["FSD"]'
  }
  var sql = `("${countryId}","${countryName}","${row.客户编码}","${row.客户简称}","2","${pricemodelcode}",1,"${row.SAPID}","SYSTEM",1773998601000,"SYSTEM",1773998601000),`
  strBuilder.push(sql)
})
combineSQL = strBuilder.join(' \n ')
//去掉尾部的，增加分号
combineSQL = combineSQL.substring(0, combineSQL.length - 1) + ';'

try {
  fs.writeFileSync('活跃客户.sql', combineSQL, 'utf8')
  console.log('文件同步写入成功')
} catch (err) {
  console.error('写入文件出错:', err)
}

//点位
sheetName = 'Sheet3' // 要读取的工作表的名称
sheet = workbook.Sheets[sheetName]
data = XLSX.utils.sheet_to_json(sheet)
strBuilder = []
let sqlPoint = ' use intl_commission_system_price;  \n'
sqlPoint += `INSERT INTO config_customer_point (country_id, customer_code, currency, product_line, point_type, value, is_expired, create_user, create_time, update_user, update_time)  VALUES`
strBuilder.push(sqlhyke)
data.forEach(row => {
  var productLine = 7
  //高端\Note\入门\POCO\平板
  if (row.产品线 == '高端') {
    productLine = 7
  } else if (row.产品线 == 'Note') {
    productLine = 8
  } else if (row.产品线 == '入门') {
    productLine = 9
  } else if (row.产品线 == 'POCO') {
    productLine = 10
  } else if (row.产品线 == '平板') {
    productLine = 11
  }

  var point_type = ''
  if (row.点位类型 == 'KA Margin') {
    point_type = 'KA_MARGIN_POINT'
  } else if (row.点位类型 == 'KA层级返利-KA Uncon Rebate%') {
    point_type = 'KA_UNCON_REBATE_POINT'
  } else if (row.点位类型 == 'KA层级返利-KA Uncon Rebate(值)') {
    point_type = 'KA_UNCON_REBATE_VALUE'
  } else if (row.点位类型 == 'KA层级返利-KA Con Rebate%') {
    point_type = 'KA_CON_REBATE_POINT'
  } else if (row.点位类型 == 'KA层级返利-KA Con Rebate(值)') {
    point_type = 'KA_CON_REBATE_VALUE'
  } else if (row.点位类型 == 'FD Margin') {
    point_type = 'FD_MARGIN_POINT'
  } else if (row.点位类型 == 'FD unconRebate%') {
    point_type = 'FD_UNCON_REBATE_POINT'
  } else if (row.点位类型 == 'FD unconRebate(值)') {
    point_type = 'FD_UNCON_REBATE_VALUE'
  } else if (row.点位类型 == 'FD conRebate%') {
    point_type = 'FD_CON_REBATE_POINT'
  } else if (row.点位类型 == 'FD conRebate(值)') {
    point_type = 'FD_CON_REBATE_VALUE'
  } else if (row.点位类型 == 'Rework') {
    point_type = 'OPERATING_COST_REWORK_VALUE'
  } else if (row.点位类型 == 'Logistics fee') {
    point_type = 'OPERATING_COST_SALE_VALUE'
  } else if (row.点位类型 == '渠道SI返利') {
    point_type = 'OPERATING_COST_ST_SUBSIDY_VALUE'
  }

  let testValue = row.值 *100;
  //剔除value尾部的%


  var sql = `("${countryId}",'${row.客户编码}','EUR','${productLine}','${point_type}',${testValue},0,'SYSTEM',1773998601000,'SYSTEM',1773998601000)`
  strBuilder.push(sql)
})
combineSQL = strBuilder.join(' \n ')
//去掉尾部的，增加分号
combineSQL = combineSQL.substring(0, combineSQL.length - 1) + ';'

try {
  fs.writeFileSync('点位数据.sql', combineSQL, 'utf8')
  console.log('文件同步写入成功')
} catch (err) {
  console.error('写入文件出错:', err)
}

