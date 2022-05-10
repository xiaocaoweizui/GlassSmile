/*
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]
提示：

2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
只会存在一个有效答案
进阶：你可以想出一个时间复杂度小于 O(n^2) 的算法吗？


*/



var func = (nums, target) => {
    /**
     *  方案一：两个指针，顺移
     */
    var posFirst = 0, posSecond = 1;
    while ( posSecond < nums.length) {
        while (posSecond < nums.length) {
            if (nums[posFirst] + nums[posSecond] == target) {
                return [posFirst, posSecond];
            }else{
                posSecond++;
            } 
        }
        if (nums[posFirst] + nums[posSecond] == target) {
            return [posFirst, posSecond];
        } else {
            posFirst++;
            posSecond = posFirst + 1;
        }
    }
    /*
    * 方案二：适用js的内置函数，findindex,执行效率没有第一种高

    var posFirst = 0, posSecond = 1;
    while (posSecond < nums.length) {
        var posSecond = nums.findIndex((n, i) => n == target - nums[posFirst] && i != posFirst);
        if (posSecond > 0) {
            return [posFirst, posSecond];
        } else {
            posFirst++;
            posSecond = posFirst + 1;
        }
    }
    */
};

var func2 = (nums, target) => {
    nums = nums.sort((a, b) => a - b);
}


var nums = [2, 7, 11, 15], target = 9;
nums = [3, 2, 4], target = 6;
var ret = func(nums, target);

console.log(` result: ${ret}`);

var arrTest = [3, 4, 1, 6, 2, 5];
var arrSet = new Set(arrTest);

console.log(arrTest.findIndex(a => a == 4));
console.log(arrTest.findIndex((a, b) => a == 3 && b != 1));
var test = func2(arrTest, target);
console.log(` test's result: ${test}`);

console.log(`nums's length:${arrTest.length}`);

