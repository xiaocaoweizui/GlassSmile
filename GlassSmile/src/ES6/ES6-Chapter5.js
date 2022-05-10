//解构
let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 2
        }
    },
    range:[0,3,4]
};

let { type, name } = node;
//或者 ({ type, name } = node);
console.log(type);//"Identifier"
console.log(name);//"foo"

let type2 = "Literal", name2 = 5;
//使用解构语法为多个变量赋值，解构函数局部变量名称在对象中不存在，返回undefinded
//注意 必须有小括号。
({ type2, name2 } = node);
console.log(type2);//undefined
console.log(name2);//undefined

//为非同名局部变量赋值
let { type: localType, name: localName } = node;
console.log(`localType : ${localType}`);//Identifier
console.log(`localName : ${localName}`);//foo

//嵌套对象也能解析
let { loc: { start } } = node;
console.log(start);//{ line: 1, column: 2 }


let { loc: { start: localStart } } = node;
console.log(localStart);//{ line: 1, column: 2 }

//数组的解构
let colors = ["red", "green", "blue"];
let [firstColor, , thridColor] = colors;
console.log(`firstColor: ${firstColor}`);//red
console.log(`thridColor: ${thridColor}`);//blue
/*
 等同代码：
  let firstColor="black",thridColor="purple"
  [firstColor,,thridColor]=colors;
*/

//变量转换
let a = 1, b = 2;
//利用数组的解构原理
[a, b] = [b, a];
console.log(a);//2
console.log(b);//1

//不定元素
let [fColor,...restColors]=colors;
console.log(fColor);//red
console.log(restColors);//[ 'green', 'blue' ]

//利用不定元素实现数组的复制功能
let [...cloneColors]=colors;
console.log(cloneColors);

//数组和对象的混合解构
let {
    loc:{start:localStart2},
    range:[,,endIndex]
}=node;
console.log(localStart2);//{ line: 1, column: 2 }
console.log(endIndex);//4

//解构参数
function  setCookie(name,value,options){
    var options=options|| {};
    let sec=options.secure,
    path=options.path,
    domain=options.domain,
    expires=options.expires;

    //...
}
//使用解构参数, options参数非必须
function setCookie(name,value,{secure,path,domain,expires}={}){

}

