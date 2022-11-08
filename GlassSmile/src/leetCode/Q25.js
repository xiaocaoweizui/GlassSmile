/*
20. 有效的括号

相关企业
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 

示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
 

提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    let stack = [];

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);

        //遇到左括号，这入栈
        if (char == '(' || char == '[' || char == '{') {
            stack.push(char);
        }
        //如果遇到右括号，则判断上一个是否左括号，如果是则出栈，否则返回false
        else if (char == ')' || char == ']' || char == '}') {
            if (stack.length <= 0) {
                return false;
            }
            if (char == ')' && stack[stack.length - 1] == '(') {
                stack.pop();
            }
            else if (char == ']' && stack[stack.length - 1] == '[') {
                stack.pop();
            }
            else if (char == '}' && stack[stack.length - 1] == '{') {
                stack.pop();
            }else{
                return false;
            }
        }
    }

    if (stack.length == 0) {
        return true;
    } else {
        return false;
    }
};

let s = "(]";
console.log(isValid(s));