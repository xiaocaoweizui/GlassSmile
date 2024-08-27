function printColor(message,color) {
  console.log(`\u001b[${color}m${message}\u001b[0m`);
}
//打印颜色
printColor("Hello World", 31);
printColor("Hello World", 32);
printColor("Hello World", 36);

/*
文本样式：

\u001b[0m：重置所有样式。
\u001b[1m：粗体或更亮的文本。
\u001b[2m：淡化的文本。
\u001b[3m：斜体文本。
\u001b[4m：带下划线的文本。
\u001b[7m：反转背景和前景色。
前景色（文本颜色）：

\u001b[30m：黑色。
\u001b[31m：红色。
\u001b[32m：绿色。
\u001b[33m：黄色。
\u001b[34m：蓝色。
\u001b[35m：洋红色。
\u001b[36m：青色。
\u001b[37m：白色。
背景色（文本背景色）：

\u001b[40m：黑色背景。
\u001b[41m：红色背景。
\u001b[42m：绿色背景。
\u001b[43m：黄色背景。
\u001b[44m：蓝色背景。
\u001b[45m：洋红色背景。
\u001b[46m：青色背景。
\u001b[47m：白色背景。


 */
