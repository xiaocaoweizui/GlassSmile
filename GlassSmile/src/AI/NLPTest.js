// 需要安装 npm install nlp_compromise
// github 地址：https://github.com/axa-group/nlp.js

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en']});

manager.addDocument('en', 'I want to buy a computer', 'buy');
manager.addDocument('en', 'Hello World!', 'greeting');

await manager.train();

const  result=await  manager.prcess('en', 'Hello!');
console.log(result);


