/*
28. 找出字符串中第一个匹配项的下标
中等
1.6K
相关企业
给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 

示例 1：

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
示例 2：

输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 

提示：

1 <= haystack.length, needle.length <= 104
haystack 和 needle 仅由小写英文字符组成
*/
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    /*
        思考：
        1、主要是要找一个字符串B在另外一个字符串A中的第一个完全匹配的位置
        2、取B的第一个字符，B[0],B字符串当长度lenB
        3、i=0，循环A字符串
            当 A[i]==B[0],循环B的长度
                j=0，j<lenB;判断A[i+j]==B[j]，如果不相等flag=false，且跳出循环
            当flag=true，则直接返回i，结束
            否则i++
            
    */
    for (let i = 0; i < haystack.length; i++) {
        var flag = true;
       // console.log(`the i : ${i}`);
        //第一个字符匹配，则进入后续
        if (haystack.charAt(i) == needle.charAt(0)) {
            for (let j = 1; j < needle.length; j++) {
               
                flag = haystack.charAt(i + j) == needle.charAt(j);
                //console.log(`the haystack : ${ haystack.charAt(i + j)},the needle is ${needle.charAt(j)},the flag: ${flag}`);
                //不匹配直接跳出
                if (!flag) {
                    break;
                }
            }
            if (flag) {
                //找到第一个匹配项
                return i;
            }
        }
    }
    return -1;

};

let haystack = "ssabutsad"
let needle = "sad";
haystack ="a"
needle ="a"
console.log(strStr(haystack,needle));