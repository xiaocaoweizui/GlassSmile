
/* 
1. 两数之和
提示
简单
17.2K
相关企业
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

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

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案
 
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // nums = nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length; i++) {
        let first = nums[i];
        let j = i + 1;
        while (nums[j] != target - first  && j< nums.length) {
                j++;
        }
        if(nums[j] == target - first){
            console.log(nums[i])
            return [i,j];
        }
    }
    
};

var nums = [2,7,11,15];
// var num2 = nums.sort((a, b) => a - b);

// console.log(num2);

console.log(twoSum(nums, 9));
