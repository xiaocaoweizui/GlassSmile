/*
17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

1:
2:abc
3:def
4:ghi
5:jkl
6:mno
7：pqrs
8:tuv
9:wxyz

示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]
 

提示：

0 <= digits.length <= 4
digits[i] 是范围 ['2', '9'] 的一个数字。

*/
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    var data = [[], [], ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z']];

    var result = [];
    digits= digits.split('');
    for (var i = 0; i < digits.length; i++) {
        if (result.length == 0) {
            result = data[digits[i] - 0];
            console.log(`${ data[digits[i] - 0]}`)
        } else {
            result = combineArray(result, data[digits[i] - 0]);
        }
    }
    return result;
};

var combineArray = function (arrA, arrB) {
    var ret = [];
    for (var i = 0; i < arrA.length; i++) {
        for (var j = 0; j < arrB.length; j++) {
          
            ret.push(arrA[i] + arrB[j]);
        }
    }
    return ret;
}

var digits = "23";
console.log(` the result is  ${letterCombinations(digits)}`);