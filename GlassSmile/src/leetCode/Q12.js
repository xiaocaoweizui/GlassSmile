/*
给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    /*
        定义 i=0，j=0
        定义数组，strRet=[];
        s 为需要遍历的字符串，字符串长度maxLen=1
        循环s，i=0，取s[i+maxLen]放入strRet中。
            1、判断strRet是否为对称字符,strRet.length=len
               条件if(j< math.floor(len/2)) while判断 strRet[j]==strRet[len-1]
               全部为true，找到了字符串，获取字符串长度maxLen

    */
    var i = 1; //默认往后一位
    var startPos = 0;
    var ret = [];
    var step = 1;
    var strArr = s.split('');
    var len = strArr.length;
    var str = strArr[0];

    while (startPos + step < len) {
        ret= s.slice(startPos,startPos+ i+ step).split('');

        //console.log(` ret ${ ret}, startPos : ${ startPos}, i: ${i}, step :${step}`);
        var j = 0;
        var flag = true;
        while (ret.length >1 && flag && j < Math.floor(ret.length / 2)) {
            if (ret[j] != ret[ret.length - 1 - j]) {
                //并非是回字字符串
                flag = false;
            } else {
                j++;
            }
        }
        if (flag) {
            step = ret.length;
            //输出
            str = ret.join('');
            i = 1;
        } else if (startPos + i + step  <len ) {
            i++;
        } else {
            startPos++;
            i=1;
        }
    }
    return str;
};

var s = "babad";
s = "cbbd";
s="aba"
var ret = longestPalindrome(s);
//console.log(s.slice(0,3).split(''));
console.log(ret);