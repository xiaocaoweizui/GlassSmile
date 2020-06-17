var _ = require('underscore');
var rows=[1,2,3,4,5,6,7];
var listCount=_.countBy(rows,function(row){return row %2==0?'even':'odd'});
console.log(listCount);

