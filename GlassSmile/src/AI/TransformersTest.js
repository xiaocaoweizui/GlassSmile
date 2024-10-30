//需要安装 npm install @xenova/transformers

//如果 npm 下载不了

/*
*  考虑使用 淘宝的 npm 镜像
*  # 设置 npm 配置
npm config set registry https://registry.npm.taobao.org

# 清除缓存
npm cache clean --force

# 重新安装依赖
* npm install
*
* */
// 如果安装了，则可以直接使用
const { pipeline } = require('@xenova/transformers');
// const { pipeline,env } = require('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0');

// const  fs=require('fs');
//
// //设置当前环境变量，不要允许本地模型，使用远程模型
// env.allowLocalModels = false;
//
// const  detect=async function (text) {
//   const  model = await pipeline('text-classification');
//   const  result = await model(text);
//   //返回情感分析结果
//   return result;
// }
//
// var text="这个项目很棒！";
// console.log(await detect(text));


//分析词意
async function analyzeSentiment(text) {
  // 加载情感分析模型
  const model = await pipeline('sentiment-analysis');

  // 对文本进行情感分析
  const result = await model(text);

  // 返回情感分析结果
  return result[0].label;
}
var text = "这个项目很棒！";
console.log(await analyzeSentiment(text));
