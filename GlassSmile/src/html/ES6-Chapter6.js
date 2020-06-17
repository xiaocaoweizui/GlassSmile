//原始类型Symbol
let firstName = Symbol("first name");
let person = {
    [firstName]: "zhangy04"
};

//将属性设置为只读 
Object.defineProperty(person, firstName, { writable: false });

let lastName=Symbol("last name");
Object.defineProperties(person,{
    [lastName]:{
        value:"yi",
        writable:false
    }
})

console.log(person[firstName]);
console.log(person[lastName]);