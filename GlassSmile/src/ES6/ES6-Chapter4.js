//对象字面量语法扩展
function createPerson(name,age){
    return {
        name,
        age,
        sayHello(){
            console.log(`My Name is ${name}`);
        }
    }
    /* 等同于
        return {
            name:name,
            age:age
        }
     */
}
var zy= createPerson("zhangy04",18);
zy.sayHello();

//Object.is 大多数情况下 等同于 ===
console.log(Object.is(5,5));//true
console.log(Object.is(5,"5"));//false

function EventTarget(){}
EventTarget.prototype={
    constructor:EventTarget,
    emit:function(msg){
        console.log(msg);
    },
    on:function(){

    }
}

var myObject=Object.create(null);
//类似jq的$.extend().
Object.assign(myObject,EventTarget.prototype);
myObject.emit("something");//something

var receiver={};
Object.assign(receiver,{
    type:"js",
    name:"es6.js"
},{
    name:"hello.js"
});
console.log(receiver);//{ type: 'js', name: 'hello.js' }