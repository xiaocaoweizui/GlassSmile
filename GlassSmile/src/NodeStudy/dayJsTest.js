//npm install dayjs
const dayjs = require('dayjs');
//节假日
//npm install chinese-workday
const  ww=require('chinese-workday')
var weekOfYear = require('dayjs/plugin/weekOfYear')


  dayjs.extend(weekOfYear);

var now=dayjs().format("YYYY-MM-DD HH:mm:ss");
console.log(now);


var week=dayjs().week();
console.log(week);

var isHoliday= ww.isHoliday(2024,4,4);
var test2=ww.isHoliday('2024-4-4');
console.log(isHoliday);
console.log(test2);
