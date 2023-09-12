

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
        let sql=`SELECT '${row.host}' host, '${row.dbname}' db_name, '${row.user}' reader_user, '${row.password}' reader_password  \n`
        strBuilder.push(sql)
})

var combineSQL=strBuilder.join(' UNION ALL ');

var ret=`
update p_database a
INNER JOIN (
	${combineSQL}
) b 
ON concat('bpm_',b.db_name)=SCHEMA()
SET a.configs=CONCAT('{"host":"',b.host,'","name":"',b.db_name,'","user":"',b.reader_user,'","password":"',b.reader_password,'"}') 
where (a.configs like '%e299dd0f773a4d47bae189fb4c1f8758in01.internal.cn-south-1.mysql.rds.myhuaweicloud.com%' or
a.configs like '%8acd68b085074970af5885793df564f4in01.internal.cn-south-1.mysql.rds.myhuaweicloud.com%' or
a.configs like '%36c2fe2798b14657b7b25b97ce58c857in01.internal.cn-south-1.mysql.rds.myhuaweicloud.com%') 
and b.host != '' and b.db_name != '' and b.reader_user != '' and b.reader_password != '';


 -- 一、 修改应用地址配置
-- 计划系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-1ebd82-prod') where code='erp60_cyjhxt';
update p_application set api_configs = replace(api_configs,'/plan.mingyuanyun.com','/plan.erp.mycyjg.com') where code='erp60_cyjhxt';
 
-- 基础数据系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-bbd31b-prod.svc') where code='erp60_xmk_zsjxt';
update p_application set api_configs = replace(api_configs,'/erpcloud.mingyuanyun.com','/erpcloud.erp.mycyjg.com') where code='erp60_xmk_zsjxt';
 
-- 动态货值--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-hzglweb-prod.svc') where code='erp60_hzgl-web';
update p_application set api_configs = replace(api_configs,'/hzgl-pre.mingyuanyun.com','/hzgl.erp.mycyjg.com') where code='erp60_hzgl-web';
 
-- 售楼系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-4a53bd-prod') where code='erp60_slxt';
update p_application set api_configs = replace(api_configs,'/sales.mingyuanyun.com','/sales.erp.mycyjg.com') where code='erp60_slxt';
 
-- 成本系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-f00796-prod.svc') where code='erp60_cycbxt';
update p_application set api_configs = replace(api_configs,'/cbxt.mingyuanyun.com','/cost.erp.mycyjg.com') where code='erp60_cycbxt';
 
-- 费用系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-2ec507-prod') where code='erp60_fyxt';
update p_application set api_configs = replace(api_configs,'/expense.mingyuanyun.com','/expense.erp.mycyjg.com') where code='erp60_fyxt';
 
-- 投资收益--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-tzsy-prod.svc') where code='erp60_tzsy';
update p_application set api_configs = replace(api_configs,'/investment.mingyuanyun.com','/tzsy.erp.mycyjg.com') where code='erp60_tzsy';
 
-- 采招系统--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','http://jmpt-multi.jmpt-multi-c8950c-prod.svc') where code='erp60_czxt';
update p_application set api_configs = replace(api_configs,'/ebs.mingyuanyun.com','/ebs.erp.mycyjg.com') where code='erp60_czxt';
 
-- 会议管理--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','') where code='hygl';
update p_application set api_configs = replace(api_configs,'/www.fdccloud.com','/qy.erpyzs.mycyjg.com') where code='hygl';
 
 
-- 业财中心--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','') where code='0901';
update p_application set api_configs = replace(api_configs,'/ibfi.mingyuanyun.com','/ibfi.erp.mycyjg.com') where code='0901';
 
-- 应用授权--
update p_application set api_configs = json_set(api_configs,'$.server_internal_addr','') where code='8888';
update p_application set api_configs = replace(api_configs,'/appauth.mingyuanyun.com','/appauth.erp.mycyjg.com') where code='8888';

-- 二、文档服务地址切换
update sys_doc_services set conf_json = replace(conf_json,'/doc-service.mingyuanyun.com','/doc.erp.mycyjg.com');

-- 三、消息地址切换
update config_settings set conf_value = replace(conf_value,'/erpcloud.mingyuanyun.com','/erpcloud.erp.mycyjg.com') where conf_key = 'notification';

-- 四、MIP基础配置
update config_settings set conf_value = json_set(conf_value,'$.mip_server_address','http://ipaas.tj.mycyjg.com') where conf_key = 'mip_info';
update config_settings set conf_value = json_set(conf_value,'$.client_id','67a9ba22ad504a34a435835d8589a0df') where conf_key = 'mip_info';
update config_settings set conf_value = json_set(conf_value,'$.client_secret','ed88e1fa5d434df08e3334b0e6cb9e66') where conf_key = 'mip_info';

-- 五、绑定MIP配置
update config_settings set conf_value = replace(conf_value,'/bpm-erp.mingyuanyun.com','/bpm.tj.mycyjg.com') where conf_key = 'mobile_config';
update config_settings set conf_value = replace(conf_value,'/ipaas-erp-prod.mingyuanyun.com','/ipaas.tj.mycyjg.com') where conf_key = 'mobile_config';
update config_settings set conf_value = replace(conf_value,'send?eventId=ca9b9b0b-4bfe-4745-b332-fa35989e4c74','send?eventId=28837aef-a04f-4a45-8793-c6b5f8f9f5f2') where conf_key = 'mobile_config';

-- 六、绑定云助手配置
update config_settings set conf_value = replace(conf_value,'/www.fdccloud.com','/qy.erpyzs.mycyjg.com') where conf_key = 'mobile_config';
`

console.log(ret);