// 需要安装 npm install natural
// compromise.js  可以从文章中提取句子
//natural.js  可以识别中文的词性
// github 地址：https://github.com/NaturalNode/natural/blob/master/examples/tokenizer/testSentenceTokenizer.js

//文本预处理
var  natural= require('natural');
let  tokenizer = new natural.WordTokenizer();
let text = "I don't like this movie! ";
let  tokens = tokenizer.tokenize(text);



console.log(tokens);

//  text = "我媳妇喜欢吃肉！ ";
//  tokens = tokenizer.tokenize(text);
// console.log(tokens);

//句子分析
text = "I don't like this movie! Please stop playing";
tokenizer=new natural.SentenceTokenizer();
console.log(tokenizer.tokenize(text));

//语法树
tokenizer=new natural.TreebankWordTokenizer();
console.log(tokenizer.tokenize(text));


//单词
tokenizer=new natural.WordPunctTokenizer();
console.log(tokenizer.tokenize(text));

//字符串距离，相识度分析
//The Jaro–Winkler distance (Winkler, 1990)是计算2个字符串之间相似度的一种算法
// 参考 https://www.jianshu.com/p/7f8aeec58d1d
console.log(natural.JaroWinklerDistance("dixon","dicksonx"))
console.log(natural.JaroWinklerDistance('not', 'same'));

//支持Levenshtein距离（编辑距离）
//莱文斯坦距离，又称Levenshtein距离，是编辑距离的一种。指两个字串之间，由一个转成另一个所需的最少编辑操作次数。允许的编辑操作包括将一个字符替换成另一个字符，插入一个字符，删除一个字符。
console.log(natural.LevenshteinDistance("ones","onez"));//1
console.log(natural.LevenshteinDistance('one', 'one'));//0

//Dice 系数可以计算两个字符串的相似度：Dice(s1,s2) = 2*comm(s1,s2)/(leng(s1)+leng(s2))。其中，comm(s1,s2) 是s1和s2中相同字符的个数; leng(s1)、leng(s2)是字符串s1、s2 的长度。
console.log(natural.DiceCoefficient('thing', 'thing'));
console.log(natural.DiceCoefficient('not', 'same'));


// 词干分析
console.log(natural.PorterStemmer.stem("running")); // 分析一个单词的词干,run
console.log(natural.PorterStemmerRu.stem("падший")); //俄语
console.log(natural.PorterStemmerRu.stem("测试人员"));
