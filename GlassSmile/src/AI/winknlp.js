//需要安装  npm install wink-nlp
///  npx wink install en

const  winknlp=require('wink-nlp');
const  itsConfig={};

const  nlp=winknlp(itsConfig);

nlp.readDefaultModel();

const text="I am going to the store";
const  doc=nlp.readDoc(text);
const  entities=doc.entities().out();
console.log(entities);

//语义分析：
const  sentiment=doc.sentiment();
console.log(sentiment);
