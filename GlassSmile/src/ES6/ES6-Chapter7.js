//Set集合和Map集合
let set=new Set();
set.add(5);
set.add("5");
set.add(5);

console.log(set.size);//2
console.log(set.has(5));//true


set.forEach(function(value,key,ownerSet){
    console.log(key + "  " + value);// 5 5
    console.log(ownerSet==set);//true
})


set.clear();

let key1={},key2={};
set.add(key1);
set.add(key2);

console.log(set.size);//2


//set 无法通过索引访问集合元素
//将set 转换成数组
let set2=new Set([1,3,43,56,7,13,51,1,3]);
let array=[...set2];

console.log(array);//[1,3,43,56,7,13,51]  自定移除了重复的元素

//去重函数：
function eliminateDuplicates(items){
    return [...new Set(items)];
}

//set 对象中的元素，都会记录一个引用。
//WeakSet 只存储对象的弱引用，不支持迭代器（foreach等）


let map=new Map();
map.set("name","zhangy04");
map.set("age","18");

//也可以如下初始化：
// let map=new Map([["name","zhangy04"],["age","18"]]);
console.log(map.size);//2
console.log(map.has("name"));//true
console.log(map.get("name"));//zhangy04

console.log(map.has("age"));//true
console.log(map.get("age"));//18

map.delete("name");
console.log(map.has("name"));//false
console.log(map.get("name"));//undefined

map.clear();
console.log(map.size);//0

//WeakMap 保存对象的弱应用
//用途：保存web页面中的dom元素

var Person=(function(){
    var privateData={},
        privateId=0;

    function Person(name){
        Object.defineProperty(this,"_id",{ value: privateId ++});
        privateData[this._id]={
            name:name
        }
    };

    Person.prototype.getName=function(){
        return privateData[this._id].name;
    }
    Person.prototype.getData=function(){
        return privateData;
    }

    return Person;
}());

var person=new Person("zhangy04");
console.log(person.getName());
console.log(person.getData());//{ '0': { name: 'zhangy04' } }

var personB=new Person("CESHI");
console.log(personB.getName());
console.log(personB.getData());//{ '0': { name: 'zhangy04' }, '1': { name: 'CESHI' } }

//上面例子，如果不主动管理，privateData中的数据永远不会消失，使用weakMap 解决这个问题
//weakMap 第一个参数必须是非null的对象
let Person2=(function(){
    let privateData=new WeakMap();
     function Person2(name){
         privateData.set(this,{name:name});
     }

     Person2.prototype.getName=function(){
         return privateData.get(this).name;
     }
     Person2.prototype.getData=function(){
        return privateData.get(this);
    }
     return Person2;
})();

var person2=new Person2("zhangy04");
console.log(person2.getName());
console.log(person2.getData());//{ '0': { name: 'zhangy04' } }

var person2B=new Person2("CESHI");
console.log(person2B.getName());
console.log(person2B.getData());//{ name: 'CESHI' }

//map 和weakMap 的选择： 是否只用对象作为集合的键名
//weakMap 不支持forEach