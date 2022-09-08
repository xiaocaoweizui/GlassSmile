/*
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

 
示例 1：

输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
示例 2:

输入：s = "aa", p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3：

输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 

提示：

1 <= s.length <= 20
1 <= p.length <= 30
s 只包含从 a-z 的小写字母。
p 只包含从 a-z 的小写字母，以及字符 . 和 *。
保证每次出现字符 * 时，前面都匹配到有效的字符

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/regular-expression-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    /*
       字符串s，p
       定义一个队列queue处理问题。
       定义两个指针posStr，posPar，分别给0
        匹配到字符后，剔除掉匹配的字符形成新的s和p，继续匹配。
        直到s和p的长度都是1，且完全相等
    */



    //字符相等
    //几种终结的场景
    //1、s=a，p=a
    //2、s=a，p=a*
    //3、s=a,p=.
    //4、s=a,p=.*
    //5、s=,p=b*
    //console.log(`s=${s},p=${p}`);
    if ((s.length == 1 && p.length == 1 && s == p) ||
        (s.length == 1 && p == s + '*') ||
        (s.length == 1 && p == '.') ||
        (s.length == 1 && p == ".*") ||
        (s.length == 0 && p.length == 2 && p.charAt(1) == '*')) {
        return true;
    }


    //匹配剩下的字符串
    //场景一，如果后面跟了*
    if (p.length > 1 && p.charAt(1) == '*') {
        if (p.charAt(0) == '.' || p.charAt(0) == s.charAt(0)) {
            //匹配多次 或者匹配0次x
            // var isMathMuit = isMatch(s.slice(1), p) ;
            //var isMathZero = isMatch(s, p.slice(2));

            return isMatch(s, p.slice(2)) || (s.length > 0 ? isMatch(s.slice(1), p) : false);
        } else {
            //匹配0次
            return isMatch(s, p.slice(2));
        }
    }
    //场景二
    else if (p.charAt(0) == '.' || p.charAt(0) == s.charAt(0)) {
        //匹配多次 或者匹配0次
        return s.length > 0 && p.length > 0 ? isMatch(s.slice(1), p.slice(1)) : false;
    }
    else {
        return false;
    }

}


// var s = "ab";
// var p = "a*";

// var s = "aa";
// var p = "a*";
// s = "aaabb";
// p = "a*ab*";
// s = "aab";
// p = "c*a*b";
s = "ab";
p = ".*c";
// s = "aaa";
// p = "ab*ac*a";
// s = "a";
// p = "ab*";
// s="a";
// p=".*";
// s = "abbabaaaaaaacaa";
// p = "a*.*b.a.*c*b*a*c*";
// s="aaaaaaaaaaaaab";
// p="a*a*a*a*a*a*a*a*a*a*a*a*b"
// s = "aaab";
// p = "a*a*a*b";
console.log(isMatch(s, p));

// var testStr = "12344556";
// console.log(testStr.slice(0, 2));
// console.log(testStr.charAt(0));

// console.log(s.slice(0));

var test = "";
console.log(test.charAt(0));


