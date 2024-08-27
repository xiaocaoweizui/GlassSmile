// 需要安装 npm install natural
// compromise.js  可以从文章中提取句子
//natural.js  可以识别中文的词性

//文本预处理
const  { WordTokenizer  } = require('natural');
const   tokenizer = new WordTokenizer();
const text = "我是一个自然语言处理";
const  tokens = tokenizer.tokenize(text);

console.log(tokens);

//文本特征提取
