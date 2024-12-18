/**
 * 需要安装： npm install nodejieba
 * 1、先安装python。（官网地址：https://www.python.org/）
 * 2、再安装 node-gyp，下面是设置 node-gyp 的淘宝镜像）
 * npm install -g cnpm --registry=https://registry.npm.taobao.org
 * cnpm install -g node-gyp
 *
 * 3、设置vs版本：npm config set msvs_version 2019
 * set MSVS_VERSION=2019
 * npm install
 *
 * 4、安装 jieba
 * 国内镜像地址：
 * npm install nodejs-jieba --registry=https://registry.npmmirror.com --nodejs-jieba_binary_host_mirror=https://registry.npmmirror.com/-/binary/nodejieba/ --MSVS_VERSION=2019
 *
 * 参考：https://blog.csdn.net/qq_42427109/article/details/107142920
 * github地址：https://github.com/yanyiwu/nodejieba

 */

const nodejieba = require('nodejs-jieba');
// 自定义词典
nodejieba.load({userDict: 'dict.txt.utf8'});
let text = '这是一个伸手不见五指的黑夜。我叫孙悟空，我爱北京，我爱Python和C++。';
console.log(nodejieba.cut(text));

console.log(nodejieba.tag(text));

// text="红掌拨清波";
/**
 * - a 形容词
 *     - ad 副形词
 *     - ag 形容词性语素
 *     - an 名形词
 * - b 区别词
 * - c 连词
 * - d 副词
 *     - df
 *     - dg 副语素
 * - e 叹词
 * - f 方位词
 * - g 语素
 * - h 前接成分
 * - i 成语
 * - j 简称略称
 * - k 后接成分
 * - l 习用语
 * - m 数词
 *     - mg
 *     - mq 数量词
 * - n 名词
 *     - ng 名词性语素
 *     - nr 人名
 *     - nrfg
 *     - nrt
 *     - ns 地名
 *     - nt 机构团体名
 *     - nz 其他专名
 * - o 拟声词
 * - p 介词
 * - q 量词
 * - r 代词
 *     - rg 代词性语素
 *     - rr 人称代词
 *     - rz 指示代词
 * - s 处所词
 * - t 时间词
 *     - tg 时语素
 * - u 助词
 *     - ud 结构助词 得
 *     - ug 时态助词
 *     - uj 结构助词 的
 *     - ul 时态助词 了
 *     - uv 结构助词 地
 *     - uz 时态助词 着
 * - v 动词
 *     - vd 副动词
 *     - vg 动词性语素
 *     - vi 不及物动词
 *     - vn 名动词
 *     - vq
 * - x 非语素词
 * - y 语气词
 * - z 状态词
 *     - zg
 */
const  tags=['ns'];
const document=nodejieba.tag(text).filter((v)=>tags.includes(v.tag)).map((v)=>v.word);
console.log(document);

