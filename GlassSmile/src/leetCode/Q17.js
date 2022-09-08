/*
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

 

示例 1：



输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
 

提示：

n == height.length
2 <= n <= 105
0 <= height[i] <= 104


来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

//这种递归的方式会导致堆栈溢出
// /**
//  * @param {number[]} height
//  * @return {number}
//  */
// var maxArea = function (height) {
//     /*
//         能盛多少水，容量=宽度* 高度
//         高度由最短的决定
//         宽度是越宽越好，所以可以从数组尾部开始

//     */
//     if (height.length < 2) {
//         return 0;
//     }
//     var area = 0;
//     var endPos = height.length - 1;
//     var startPos = 0;

//     if (height[endPos] > height[startPos]) {
//         //尾部的高度大于首部
//         //计算容量
//         var newArea = (endPos - startPos) * height[startPos];
//         var temp = maxArea(height.slice(startPos + 1));
//         area = newArea > temp ? newArea : temp;

//     } else {
//         var newArea = (endPos - startPos) * height[endPos];
//         var temp = maxArea(height.slice(0, endPos));
//         area = newArea > temp ? newArea : temp;
//     }

//     return area;
// };

/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function (height) {
    /*
        能盛多少水，容量=宽度* 高度
        高度由最短的决定
        宽度是越宽越好，所以可以从数组尾部开始

    */
   
    var area = 0;
    var endPos = height.length - 1;
    var startPos = 0;

    while(endPos>startPos){
        if (height[endPos] > height[startPos]) {
            //尾部的高度大于首部
            //计算容量
            var newArea = (endPos - startPos) * height[startPos];
            area = newArea > area ? newArea : area;
            startPos++;
    
        } else {
            var newArea = (endPos - startPos) * height[endPos];
            area = newArea > area ? newArea : area;
            endPos--;
        }
    
    }
   
    return area;
};



var height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(height.slice(0, 8));
console.log(maxArea(height));