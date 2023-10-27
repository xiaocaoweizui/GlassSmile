/**
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。

 

示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
 

提示：

1 <= s.length <= 3 * 105
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式
'+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
'-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
输入中不存在两个连续的操作符
每个数字和运行的计算将适合于一个有符号的 32位 整数
 * 
 */

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    /**
     * 遍历s，去读s[i]
     * 采用堆栈的模式进行处理
     * i=0,遍历s
     *      读取第一个 有效的值  a,入栈 
     *          操作符优先级：+ ,- > (,)
     *          遇到操作符，出栈一个元素，如果没有，默认给0
     */
    var arr = [];
    for (var i = 0; i < s.length;) {
        var num = null;
        //遇到空格直接下一个
        if (s[i] == " ") { i++; continue; }
        if (s[i] == "-" ) {
                //特殊处理，当遇到负号时，如果前面一个不为数值，则默认插入一个0
                if(arr.length<=0 || isNaN(arr[arr.length-1]) ){
                    arr.push(0);
                }
         
        }
        //获取字符串中的下一个数值 num
        while (s[i] != " " && !isNaN(s[i]) && i < s.length) {
            if (num == null) {
                num = s[i];
            } else {
                num = (num*10 - 0) + (s[i] - 0);
            }
            i++;
        }
        //根据获取的值 进行计算
        if (num != null) {
            //取到值了,放入堆栈
            arr.push(num)
            //计算一遍
            getCalc(arr);

        } else {
            if (s[i] == ")") {
                // 此处处理（5）的场景存在问题
                var numC = arr.pop();
                var oper = arr.pop();

                if (oper == "(") {
                    arr.push(numC);
                    //计算一遍
                    getCalc(arr);
                    i++;
                } else {
                    console.log("格式错误2!")
                    return;
                }
            } else {
                arr.push(s[i]);
                i++;
            }
        }
        // console.log(`the  arr is ${arr}`);
    }
    return arr.pop();
};

//计算堆栈内的值
function getCalc(arr) {
    while (arr.length > 2 && !isNaN(arr[arr.length - 1]) && !isNaN(arr[arr.length - 3])) {
        var numA = arr.pop();
        var oper = arr.pop();
        var numB = arr.pop();

        var retA = 0;
        switch (oper) {
            case '-':
                retA = numB - numA;
                break;
            case '+':
                retA = (numB - 0) + (numA - 0);
                break;
            default:
                console.log("格式错误！");
                break;
        }
        arr.push(retA);
    }
}


var s = "-1-(12+1)";
// s = "(1+(4+5+2)-3)+(6+8)";
s = " 1 + 1";
// console.log(!isNaN(" "));
s = "2147483647";
s="1-(     -2)";
var rett = calculate(s);
console.log(`the return is : ${rett}`);

// console.log(Math.pow(10,3))