const codeTools = require("./codeTools");
var fieldsStrings=`id
priceQuotationCode
tradeCustomer
trade_customer_id
local_currency_code
trade_currency_code
rate
item_code
ram
rom
product_line_id
product_line
sap_id
product_id
rrp
sip
status
create_user
create_time
update_user
update_time
price_system_code
product_name
product_number
product_name_cn
custom_content
charger_type
local_made_type
total_model_type
suite_type
sign_sip
sign_uncon_rebate
sign_con_rebate
sign_cdf
oa_account_period
lc_dead_line
port
port_id
transport_type
trade_terms
biz_mode
biz_mode_code
moq
tax_country_id
biz_principal_id
declare_country_id
pay_type
remark
country_grant_price
ean_code
tax_country_name
declare_country_name
biz_principal_name
business_account_id
business_account`


//按 tab 进行拆分字符串，为数组
var fieldsArray = fieldsStrings.split('\t');
//全部转换为大小写
var fieldsArrayUpper = fieldsArray.map(function (item) {
  return codeTools.toJavaName(item);
})

console.log(fieldsArrayUpper.toString());
