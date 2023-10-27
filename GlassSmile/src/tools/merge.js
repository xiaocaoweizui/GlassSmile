define([
    'require','/module/moduleA.js'
], function (require, aa) {
  // var aa= require('../module/moduleA');
    return {
        ret: aa.name,
        hello:aa.sayHello
    }
});