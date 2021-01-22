/**
 * 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。

 

示例 1：

输入：A = [1,2,0,0], K = 34
输出：[1,2,3,4]
解释：1200 + 34 = 1234
示例 2：

输入：A = [2,7,4], K = 181
输出：[4,5,5]
解释：274 + 181 = 455
示例 3：

输入：A = [2,1,5], K = 806
输出：[1,0,2,1]
解释：215 + 806 = 1021
示例 4：

输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
输出：[1,0,0,0,0,0,0,0,0,0,0]
解释：9999999999 + 1 = 10000000000
 

提示：

1 <= A.length <= 10000
0 <= A[i] <= 9
0 <= K <= 10000
如果 A.length > 1，那么 A[0] != 0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-to-array-form-of-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 
 */

/**
* @param {number[]} A
* @param {number} K
* @return {number[]}
*/
var addToArrayForm = function (A, K) {
    var len = A.length;
    var KArr = [];
    while (K >= 10) {
        KArr.push(K % 10);
        K = Math.floor(K / 10);
    }
    KArr.push(K);
    KArr.reverse();

    var Klen = KArr.length;
    var retArr = [];
    var pos = 0;
    var flag = 0;//相加的进位
    while (len - pos > 0 || Klen - pos > 0 || flag>0) {
        var numA = len - pos > 0 ? A[len - 1 - pos] : 0;
        var numk = Klen - pos > 0 ? KArr[Klen - 1 - pos] : 0;
        var ret = numA + numk + flag;
        flag = Math.floor(ret / 10);
        retArr.push(ret % 10);
        pos++;
    }
    return retArr.reverse();
};

var A = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9], K = 1;
A = [1, 2, 6, 3, 0, 7, 1, 7, 1, 9, 7, 5, 6, 6, 4, 4, 0, 0, 6, 3];
K = 516;
A=[2,1,5];
K=806;
var ret = addToArrayForm(A, K);
console.log(ret);
