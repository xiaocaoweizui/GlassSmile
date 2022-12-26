/*
29. 两数相除
中等
1K
相关企业
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

 

示例 1:

输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
示例 2:

输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = truncate(-2.33333..) = -2
 

提示：

被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
*/
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    /*
        思考：
        1、如果不用除相关的函数，用什么？——加减法？
         算法： dividend-divisor*N=result，result<divisor，N是商
    */
    var i = 0;

    //特殊处理
    if (dividend == 0) { return 0; }


    var flag = dividend * divisor > 0;
    //默认转正数
    dividend = dividend < 0 ? 0 - dividend : dividend;
    divisor = divisor < 0 ? 0 - divisor : divisor;
    if (dividend < divisor) { return 0; }


    //console.log(`the dividend :${dividend}; the divisor: ${divisor}`);

    do {
        dividend = dividend - divisor;
        i++;
    }
    while (dividend >= divisor)


    var result = flag ? i : 0 - i;
    // console.log(`the dividend :${dividend}; the divisor: ${divisor}; the result :${result}`);


    if (result > 2147483647 || result < -2147483648) {
        return 2147483647
    } else {
        return result
    }
};

let dividend = 10;
let divisor = 3;

console.log(`the rest: ${divide(dividend, divisor)}`);