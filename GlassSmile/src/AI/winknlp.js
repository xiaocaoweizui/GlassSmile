//需要安装  npm install wink-nlp
///  参看地址 https://gitcode.com/gh_mirrors/wi/wink-nlp/overview?utm_source=artical_gitcode&index=bottom&type=card&webUrl

const  winknlp=require('wink-nlp');
const  model=winknlp.loadModel('en');

const  doc=model.doc('this is a sample sentence.')
console.log(doc.sentences());

// const  itsConfig={};
//
// const  nlp=winknlp(itsConfig);
//
// nlp.readDefaultModel();
//
// const text="I am going to the store";
// const  doc=nlp.readDoc(text);
// const  entities=doc.entities().out();
// console.log(entities);
//
// //语义分析：
// const  sentiment=doc.sentiment();
// console.log(sentiment);
