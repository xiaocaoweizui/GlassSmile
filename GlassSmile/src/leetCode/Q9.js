/*
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。


示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
示例 4:

输入: s = ""
输出: 0
 

提示：

0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    //1、假定不重复字符串为A，长度为0.
    //2、遍历字符串，一个一个找字符，不重复则扩充到不含重复的字符串a钟 继续往后找
    //3、如果发现 后续字符在 a中存在，重复字符串所在位置为index，固定住a，比较a和A的长度，取长度最长的保存在A，长度为len
    //继续从index的位置，重新开始重复2、3两步，直到字符串尾部
    //var longestStr = [];
    var lengthOfLongestStr=0; 
    var tempStr = [];
    var sameWordIndexIntempStr = 0, tempStrStartindexInS = 0;
    for (var i = 0; i < s.length; i++) {
        var isExist = false;
        for (var j = 0; j < tempStr.length; j++) {
            if (s[i] == tempStr[j]) {
                isExist = true;
                sameWordIndexIntempStr = j;
                continue;
            }
        }
        if (!isExist) {
            if (tempStr.length == 0) {
                tempStrStartindexInS = i;
            }
            tempStr.push(s[i]);
        } else {
            if (tempStr.length > lengthOfLongestStr) {
                lengthOfLongestStr = tempStr.length;
            }
            i = tempStrStartindexInS + sameWordIndexIntempStr ;
            tempStr=[];
        }
    }
    return tempStr.length > lengthOfLongestStr?tempStr.length: lengthOfLongestStr;
};

// var ret=lengthOfLongestSubstring("abcabcbb");

// console.log(`the length of longest substring is ${ret}`);

// ret=lengthOfLongestSubstring("pwwkew");

// console.log(`the length of longest substring is ${ret}`);

ret=lengthOfLongestSubstring(" ");

console.log(`the length of longest substring is ${ret}`);