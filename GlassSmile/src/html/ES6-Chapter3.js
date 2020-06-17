
function makeRequst(url, timeout = 2000, callback = function () { }) {
    console.log(url);
    console.log(timeout);
    callback();
}
//只有在参数是undefinded的情况下才使用默认值
makeRequst("test");
makeRequst("test", 500);
makeRequst("test", 400, function () {
    console.log("callback");
});

//默认值是arguments对象保持和命名参数分离

function mixArgs(first, second = "b") {
    console.log(arguments.length);//1
    console.log(first == arguments[0]);//true
    console.log(second == arguments[1]);//false

    first = "1";
    second = "2";

    console.log(first == arguments[0]);//false
    console.log(second == arguments[1]);//false
}
mixArgs("a");

function mixArgsNo(first, second) {
    console.log(arguments.length);//2
    console.log(first == arguments[0]);//true
    console.log(second == arguments[1]);//true

    first = "1";
    second = "2";

    console.log(first == arguments[0]);//true
    console.log(second == arguments[1]);//true
}
mixArgsNo("a", "b");

//默认参数表达式
//参数默认值，只允许后面的参数引用前面参数
let value = 5;
function getValue(num) {
    return value += num;
}
function add(first, second = getValue(first)) {
    return first + second;
}
console.log(add(1, 1));//2
console.log(add(1));//7
console.log(add(1));//8

//不定参数（最多一个，且放在结尾）
//拷贝对象函数
function pick(object, ...keys) {
    /*
    Object.create(null) :创建纯净的对象,不含构造函数，绝对没有任何属性。（obj.constructor=undefinded）
    {}或者new Ojbect()创建的对象都构造函数和属性
    */
    let result = Object.create(null);
    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
var book = {
    "title": "ES6.JS",
    "author": "someOne",
    "date": "2016-06-16"
}
var bookPick = pick(book, "title", "date");
console.log(bookPick);//{title: "ES6.JS", date: "2016-06-16"}

//动态创建函数
var addDynamic = new Function("first", "second=first", "...args", "if(args.length>0){return first+args[args.length-1];}else{return first+second};");
console.log(addDynamic(1, 2));//3
console.log(addDynamic(3));//6
console.log(addDynamic(1, 2, 3, 4, 5, 6, 7));//8

//展开运算符
let values = [25, 8, 50, 7, 75, 100];
//apply ,第一参数是函数运行的环境this对象，第二参数是参数
var max = Math.max.apply(Math, values);
var maxES6 = Math.max(...values);
console.log(max);//100
console.log(maxES6);//100


//函数的name属性
var doSomething = function () {

};
console.log(doSomething.name);//doSomething
console.log(doSomething.bind().name);//bound doSomething
console.log((new Function()).name);//anonymous

//判断函数是否为new创建
function Person(name) {
    //new.target指被特定的函数调用
    //非new 调用new.target=“undefined”;
    if (typeof new.target !== "undefined") {
        this.name = name;
    } else {
        throw new Error("必须通过new关键字调用Person");
    }
}
var person = new Person("zhangy04");
//  var notAPerson = Person.call(person, "Test");//抛出异常

function AnotherPerson(name) {
    Person.call(this, name);
}
// var anOtherPerson = new AnotherPerson("other");//抛出异常

//块级函数
if (true) {
    console.log(typeof innerFunc);//"function",块级函数定义被提升了
    function innerFunc() {

    }
    innerFunc();
}
console.log(typeof innerFunc);//"undefined",无效对象.实际在chrome 时返回的function


//箭头函数，特点：
//1、没有this、super、arguments、new.targets绑定
//2、不能通过new调用，没有构造函数[Construct]
//3、没有原型prototype
//4、不可改变函数内部的this，不支持arguments对象，不支持重复的命名参数
let reflect = value => value;
//实际上等于
let reflect2 = function (value) {
    return value;
};

//多参数
let sum = (numA, numB) => numA + numB;
/* 等同于
    let sum=function(numA,numB){
        return numA + numB;
    }
*/

// 没有参数
let getName = () => "Zhangy04";
/* 等同于
    let getName=function(){
        return "Zhangy04";
    }
*/

let doNothing = () => { };
/*等同于 let doNothing=function(){};*/

let getTempItem = () => ({ id: "test", name: "张毅" });
/*等同于
  let getTempItem =function(){
      return {
          id: "test",
          name: "张毅"
      }
  }
*/

//创建立即执行的函数
let user = ((name) => {
    return {
        getName: () => name
    }
})("zhangy04");
console.log(user.getName());


var vals = [10, 8, 15, 12, 2, 6, 18, 56, 1, 13];
//排序，由小到大
var ret = vals.sort((a, b) => a - b);
console.log(ret);