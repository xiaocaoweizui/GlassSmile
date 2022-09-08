/*
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
 

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"
 

提示：

1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/zigzag-conversion
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    /*
        序号从0开始，假设row=4
        则：（下述数字是字符在字符串s中的index位置）
        0     6      12
        1   5 7   11 13
        2 4   8 10   14
        3     9      15

        所以我们可以计算出一个z形拥有的字符数totaNumber=3*row-2
        每一个z形占 row列，所以假设字符a在字符串s中的位置位index，
        字符a在z形的位置为pos=index%（3*row-2）
        那边a的x轴的偏移量x_offset=row* math.floor（index/（3*row-2））；

        识别三种情况：
        1、z形的左侧,此时，pos<n，字符的坐标（x,y）=(pos,offset)
        2、z形中间，此时，n<= pos<2n-2,字符的坐标（x，y）=（2*row-2-pos，offset+pos+1-row）
        3、z形右侧，此时，pos>=2n-2,字符的坐标（x，y）=(row-2+offset*row,pos-2*row+2)


    */
    if (numRows < 2) {
        return s;
    }
    var len = s.length;
    //console.log(len);
    var arrPos = [];
    //var arr = [];
    var maxCol = Math.ceil(len / (2 * numRows - 2)) * (numRows - 1);
    //console.log(maxCol);
    for (var index = 0; index < len; index++) {
        var pos = index % (2 * numRows - 2);
        var x = 0;
        var y = 0;
        var offset = (numRows - 1) * Math.floor(index / (2 * numRows - 2));
        if (pos < numRows) {
            // 当前字符，在z形二维数组的坐标
            //二维转一维数组
            x = pos;
            y = offset;
        } else {
            x = 2 * numRows - 2 - pos;
            y = offset + pos + 1 - numRows;
        }
        //arr.push([x, y]);
        arrPos[x * maxCol + y] = s.charAt(index);
    }
    //console.log(arr);
    var ret = "";
    for (var i = 0; i < arrPos.length; i++) {
        if (arrPos[i] != undefined) {
            ret += arrPos[i];
        }
    }

    return ret;

};

//var arr = [[0, 1, 3], [4, 5, 6]];
//console.log(arr[1][0]);
var s = "PAYPALISHIRING";
var numRows = 3;
console.log(convert(s, numRows));
var numRows = 4;
console.log(convert(s, numRows));

var s = "A";
var numRows = 1;
console.log(convert(s, numRows));