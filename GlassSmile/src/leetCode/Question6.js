/**
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
示例 3：

输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000
示例 4：

输入：nums1 = [], nums2 = [1]
输出：1.00000
示例 5：

输入：nums1 = [2], nums2 = []
输出：2.00000
 

提示：

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6

 * 
 * 
 */

/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
var findMedianSortedArrays = function (nums1, nums2) {
    var len1 = nums1.length;
    var len2 = nums2.length;
    var count = 0;
    //中位數的位置
    var midPos = Math.floor((len1 + len2 + 1) / 2);
    var midPosNext = midPos + (len1 + len2 + 1) % 2;

   // console.log("中位值位置：" + midPos.toString() + " ," + midPosNext.toString());

    var midNum1 = 0;
    var midNum2 = 0;
    var isFindAll = 0;

    var s1_Pos = 0;
    var s2_Pos = 0;

    while (isFindAll < 2 && (s1_Pos < len1 || s2_Pos < len2)) {
        var num = 0;

        if (s1_Pos >= len1) {
            num = nums2[s2_Pos];
            s2_Pos++;
        } else if (s2_Pos >= len2) {
            num = nums1[s1_Pos];
            s1_Pos++;
        } else if (nums1[s1_Pos] <= nums2[s2_Pos]) {
            num = nums1[s1_Pos];
            s1_Pos++;
        } else {
            num = nums2[s2_Pos];
            s2_Pos++;
        }

        //console.log("选择的值：" + num.toString() + ",当前位置 ：" + s1_Pos.toString() + " , " + s2_Pos.toString());

        count++;

        if (count == midPos) {
            midNum1 = num;
            isFindAll++;
        }
        //console.log("第一次" + isFindAll.toString());

        if (count == midPosNext) {
            midNum2 = num;
            isFindAll++;
        }
        //console.log("第er次" + isFindAll.toString());
    }
   // console.log("中位值：" + midNum1.toString() + " ," + midNum2.toString());
    return (midNum1 + midNum2) / 2.00;

};


var nums1 = [1, 3], nums2 = [2];
nums1 = [1, 2], nums2 = [3, 4];
var ret = findMedianSortedArrays(nums1, nums2);
console.log(ret);