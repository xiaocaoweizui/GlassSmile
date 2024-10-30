/**
 *   npm install opencc
 */
const OpenCC = require('opencc');
const converter = new OpenCC('t2s.json'); // 创建一个从繁体到简体的转换器

const traditionalText = '這是一個測試文本。';
converter.convert(traditionalText, (err, simplifiedText) => {
  if (err) {
    console.error('转换过程中发生错误:', err);
    return;
  }
  console.log('转换后的简体文本:', simplifiedText);
});
