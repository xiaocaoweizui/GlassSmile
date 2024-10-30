/**
 * 需要安装： npm install nodejieba
 * 参考：https://blog.csdn.net/qq_42427109/article/details/107142920
 *  但在安装该包的时候可能会遇到npm下载权限的问题，因为底层使用了CppJieba，当使用sudo npm安装时会提示权限不足
 *
 *  解决办法
 *  单独下载该包文件
 *  sudo npm install nodejieba --unsafe-perm
 *  将该包缓存至全局
 *  sudo npm install nodejieba -g --unsafe-perm
 *  配置npm<br> sudo su -
 *  npm config set unsafe-perm
 *  切换至root身份运行
 *  sudo su -
 *  npm i
 * </blockquote>
 */

const nodejieba = require('nodejieba');
// 自定义词典
jieba.load({userDict: 'dict.txt.utf8'});
let text = '这是一个伸手不见五指的黑夜。我叫孙悟空，我爱北京，我爱Python和C++。';
console.log(nodejieba.cut(text));

text="红掌拨清波";
/**
 * n 名词
 * v 动词
 * nt 专有名词
 * nr 人名
 * t 助词
 * vn 虚词
 * w 助词
 */
const  tags=['n','v','nt','nr','t'];
const document=jieba.tag(text).filter((v)=>tags.includes(v.tag)).map((v)=>v.word);
console.log(document);

