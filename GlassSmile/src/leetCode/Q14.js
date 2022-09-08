/*
给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。
 

示例 1：

输入：x = 123
输出：321
示例 2：

输入：x = -123
输出：-321
示例 3：

输入：x = 120
输出：21
示例 4：

输入：x = 0
输出：0
 

提示：

-2^31 <= x <= 2^31 - 1
-2147483648 <=x<=2147483647
来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/reverse-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


*/
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {

    /*
        定义余数num=x%10
        while循环，x>10 && num!=0
        1、将x除10，得到值value，以及余数left
        2、num=num*10+left;
          如果num不在 -2147483648 <=x<=2147483647之间，则返回0
        3、x=value

    */
    var num = x % 10;
    x = Math.trunc(x / 10);
    var outOfRange = false;
    while (Math.abs(x) >= 1 && !outOfRange) {
        var left = x % 10;
        num = num * 10 + left;
        if (num < -2147483648 || num > 2147483647) {
            outOfRange = true;
        }
        x = Math.trunc(x / 10);
    }
    return outOfRange ? 0 : num;

};

var x = -312;
x = 2147483647;
x = 120;
console.log(reverse(x));