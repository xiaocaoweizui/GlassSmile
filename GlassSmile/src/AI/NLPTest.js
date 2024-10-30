// 需要安装 npm install nlp_compromise
// github 地址：https://gitee.com/mirrors/compromise-js
// 文档地址：https://observablehq.com/@spencermountain/tutorial-1


const  nlp=require('compromise');

let doc = nlp('she sells seashells by the seashore.')
doc.verbs().toPastTense();
let text= doc.text();

console.log(text);


// var nlp = require('compromise');
doc=nlp(`we don't need no education`);
doc.contractions().expand();
text= doc.text();
console.log(text);

//doc=nlp('Tony Hawk did a kickflip');
doc=nlp("张三读书！");
text= doc.people();
console.log(text);

