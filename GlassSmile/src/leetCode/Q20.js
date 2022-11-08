/*
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

 

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
 

提示：

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-common-prefix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    var flag = true;
    var j = -1;
    var ret = "";
    var firstChar = "";

    while (flag) {
        j++;
        ret += firstChar;
        firstChar = strs[0].charAt(j);

        if (firstChar == "") {
            flag = false;
        } else {
            for (var i = 1; i < strs.length; i++) {
                if (firstChar != strs[i].charAt(j)) {
                    flag = false;
                    continue;
                }
            }
        }

    }
    return ret;

};

var strs = ["flower", "flow", "flight"]
// var char = "flower";
strs = ["", ""];
strs = ["aaa", "aa", "aaa"];
console.log(longestCommonPrefix(strs));
// console.log(strs[1].charAt(2));

// var  fengdai=15*2.3;
// var menpaifabao=15*5.3;
// var wulifangyu=25*2.2;
// var wuliang=5*3;

// console.log(`fengdai:${fengdai},menpaifabao:${menpaifabao},wulifangyu:${wulifangyu},wuliang:${wuliang}`);