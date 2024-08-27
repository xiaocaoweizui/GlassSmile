

const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.read(fs.readFileSync('data.xlsx'), { type: 'buffer' });

const sheetName = 'Sheet1'; // 要读取的工作表的名称
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// console.log(`Sheet: ${sheetName}`);
// console.log(data);


var strBuilder=[];
data.forEach(row => strBuilder.push(row.code));

var ret=strBuilder.join(',');

console.log(ret);
console.log(strBuilder.join(' '));

var url=`https://bi.mypaas.com/api/monitor/move/sql?tenant_codes=${ret}`;
console.log(`数见下载迁移SQL地址（要先登录）：${url}`);
var fileUrl=`https://dmp.tj.mycyjg.com/api/monitor/move/attach?origin_endpoint=minio-api-dmp-saas-hw.mypaas.com&origin_bucket=dmp&origin_oss_service=minio&reg_rundeck=1&tenant_codes=${ret}`;
console.log(`数见附件迁移接口地址：${fileUrl}`);

var fileUrl2=`https://bi-admin.mypaas.com/api/project/disable_migrated_project?migrate_to=https://dmp.tj.mycyjg.com&codes=${ret}`;
console.log(`数见禁用房开租户接口地址：${fileUrl2}`);


var ret2='"'+ strBuilder.join('","') +'"';
var forbidTenantSQL=`update tenant set  enabled=0 where code in (${ret2})`;
console.log(`禁用已经迁移的租户SQL：${forbidTenantSQL}`);


var turnOnTenantSQL=`update tenant set  enabled=1 where code in (${ret2})`;
console.log(`启用房开已经迁移的租户SQL：${turnOnTenantSQL}`);
