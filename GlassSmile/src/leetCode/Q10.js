/*
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
 

提示：

1 <= n <= 8

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/generate-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    //n表示左括号的个数，m表示右括号的个数；n=m
    //生成的括号字符串，可以通过堆栈的模式完全出栈
    //n 的范围（1，8），那么字符串的个数可以有2^16种
    /*
        定义一个不限制大小的队列数组queue=[]
        1、从左括号n中选择一个，进入队列，得到剩下的左括号个数 nleft=n-1;
        2、取出队列第一个str，判断str的长度==2n，
            2.1 不等于，则分别选择一个( 和 ），拼接到str的后面形成strL和strR
            2.1.1 如果strR中的右括号<=左括号则，则入队列
            2.1.2 strL直接入队
            2.2 等于，则队列的头往后移一位。直到队列尾部。
    */

    var queue = [{ str: "(", leftCount: 1, rightCount: 0 }];
    var queuePos = 0;
    while (queuePos < queue.length) {
        var obj = queue[queuePos];
        if (obj.str.length == 2 * n) {
            queuePos++;
        } else {
            queue.shift();
            // console.log(obj);
            if (n - obj.leftCount > 0) {
                queue.push({ str: obj.str + "(", leftCount: obj.leftCount + 1, rightCount: obj.rightCount });
            }
            if (n - obj.rightCount > 0 && obj.rightCount + 1 <= obj.leftCount) {
                queue.push({ str: obj.str + ")", leftCount: obj.leftCount, rightCount: obj.rightCount + 1 });
            }
        }
    }
    // console.log(queue);
    for (var i = 0; i < queue.length; i++) {
        queue[i] = queue[i].str;
    }

    return queue;

};

//  var arr=[1,2,3,4];
//  arr.push(5);
//  console.log(arr);
// var num=arr.shift();
// console.log(`输出num=${num}`);

// num=arr.shift();
// console.log(`输出num=${num}`);

 var arr = generateParenthesis(3);
//console.log(` this arrary of Parenthesis is ${arr}`);
console.log(arr);