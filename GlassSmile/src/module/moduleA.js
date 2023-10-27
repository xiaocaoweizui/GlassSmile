
/**
 * 在浏览器中使用 ES6的模块化，参考地址：https://juejin.cn/post/7254829784282546233
 * 
 */

define(function (require, exports, module) {
  let name = 'ChatAi';
  exports.sayHello = function () {
    alert(`Hello, ${name}!`);
  }
  exports.name =name;
});