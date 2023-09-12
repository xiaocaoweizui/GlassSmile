

const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.read(fs.readFileSync('data.xlsx'), { type: 'buffer' });

const sheetName = 'Sheet1'; // 要读取的工作表的名称
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// console.log(`Sheet: ${sheetName}`);
// console.log(data);

var strBuilder=[];
data.forEach(row => {
    //console.log(row);
        let sql=`
        DELETE FROM wzs_user 
        WHERE wzs_user_id IN ( SELECT wzs_user_id FROM wzs_user_to_tenant a LEFT JOIN p_tenants b ON a.tenant_id = b.tenant_id WHERE b.tenant_code = "${row.code}" );
        
        DELETE FROM wzs_user_to_tenant a
        where a.tenant_id in (  SELECT tenant_id from  p_tenants b 
        where b.tenant_code = "${row.code}");
        
        update p_tenants set domain_id="19791346-7158-11ed-ac13-fa163e360d46"
        where tenant_code="${row.code}" and domain_id="2245643a-6967-11ed-ae49-fa163eb3dbe3";
        
         \n`
        strBuilder.push(sql)
})

var ret=strBuilder.join('');

console.log(ret);