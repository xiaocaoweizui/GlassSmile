/**
 * 32. 最长有效括号
困难
2.4K
相关企业
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0
 

提示：

0 <= s.length <= 3 * 104
s[i] 为 '(' 或 ')'
 * 
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    /**
     * 首先有效括号必须以（ 开头。
     * 1、遍历s,找到第一个（，然后加入堆栈
     * 2、找到下一个，如果是（ 入堆栈，如果是），则和（一起出堆栈，记录长度n
     * 3、循环第2步，当堆栈为空，而入栈的第一个是），则记录下本次长度n
     * 4、跳转到第1步，重新找n1,比较n和n1,取最大值赋值给n
     * 5、到结尾结束遍历
     */
   
    var longPath = 0;
    for (var i = 0; i < s.length; i++) {
        if (s[i] == ')') { continue; }
        var arr = [];
        var n = 0;
        //当堆栈为空，而入栈的第一个是），则记录下本次长度n
        var j = i;
        while (j < s.length) {
            // console.log(`the s[j] is :${s[j]},j is ${j},n is :${n}`)
            if (s[j] == '(') {
                arr[arr.length] = s[j];
            } else if (s[j] == ')' ) {
                if( arr[arr.length-1]=='('){
                    arr.pop();
                    n += 2;
                }
                else{
                    break;
                }
              
            }
            // console.log(`the arr is ${arr},n is ${n}`)
            j++;

            if (arr.length == 0) {
                longPath = longPath > n ? longPath : n;
            }
        }
      
        //console.log(`the longPath : ${longPath}`);

    }
    return longPath;
};

let s = "(()";
// console.log(s.length);
let ret = 0;
// ret=longestValidParentheses(s);
// console.log(`the result is :${ret}`);

// s = ")()())";
// ret=longestValidParentheses(s);
// console.log(`the result is :${ret}`);

// s = "()(()"
// ret = longestValidParentheses(s);
// console.log(`the result is :${ret}`);

s =")()())()()("
ret = longestValidParentheses(s);
console.log(`the result is :${ret}`);
