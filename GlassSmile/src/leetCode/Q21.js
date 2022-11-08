/*
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
示例 2：

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
示例 3：

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
 

提示：

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    /*
         数组进行一个排序，从小到大。
         数组长度length
        三个指针，pos,posLeft，posRight
        循环 pos
            posLeft=pos+1；
            posRight=length-1;

            ret=nums[pos]+nums[posLeft]+nums[posRight];
            if(ret>0){
                while(nums[posRight-1]!=nums[posRight] && posRight>posLeft){
                    posRight--;
                }
   
            }else if(ret<0){

            }

    */
    nums = nums.sort((a, b) => { return a - b; });
    var length = nums.length;
    var result = [];

    if (length < 3) { return []; }
    for (var pos = 0; pos < length - 2; pos++) {
        //如果重复了要跳过
        if (pos > 0) {
            while (nums[pos] == nums[pos - 1]) {
                pos++;
            }
        }

        var posLeft = pos + 1;
        var posRight = length - 1;


        while (posLeft < posRight) {
            var ret = nums[pos] + nums[posLeft] + nums[posRight];
            if (ret > 0) {
                //说明太大，右边的往左边移动一位，判断是否重复，重复了再移动一位，保证不重复
                do { posRight--; }
                while (nums[posRight] == nums[posRight + 1] && posRight > posLeft)
                // console.log(` pos:${pos},posLeft:${posLeft},posRight:${posRight},nums[pos]:${nums[pos]},nums[posLeft]:${nums[posLeft]},nums[posRight]:${nums[posRight]}`)
            } else if (ret < 0) {
                // console.log(`nums[posLeft + 1]:${nums[posLeft + 1]},nums[posLeft]:${nums[posLeft]}`)
                //说明太小，左边的往右边移动一位，判断是否重复，重复了再移动一位，保证不重复
                do { posLeft++; }
                while (nums[posLeft] == nums[posLeft - 1] && posRight > posLeft)
                // console.log(` pos:${pos},posLeft:${posLeft},posRight:${posRight},nums[pos]:${nums[pos]},nums[posLeft]:${nums[posLeft]},nums[posRight]:${nums[posRight]}`)
            } else {
                result.push([nums[pos], nums[posLeft], nums[posRight]]);
                // console.log(` pos:${pos},posLeft:${posLeft},posRight:${posRight},nums[pos]:${nums[pos]},nums[posLeft]:${nums[posLeft]},nums[posRight]:${nums[posRight]}`)

                //找到后，同时把posLeft往右边移动一位、posRight往左边移动一位
                do { posRight--; }
                while (nums[posRight] == nums[posRight + 1] && posRight > posLeft)
                do { posLeft++; }
                while (nums[posLeft] == nums[posLeft - 1] && posRight > posLeft)
                // console.log(` pos:${pos},posLeft:${posLeft},posRight:${posRight},nums[pos]:${nums[pos]},nums[posLeft]:${nums[posLeft]},nums[posRight]:${nums[posRight]}`)
            }

        }

    }

    return result;
};




var nums = [-1, 0, 1, 2, -1, -4];
nums = [1, 2, -2, -1];
//[-2,-1,1,2]
nums = [3, 0, -2, -1, 1, 2];
//[-2,-1,0,1,2,3]
// nums = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
// console.log(nums.sort((a, b) => { return a - b; }));
nums = [-1, 0, 1, 2, -1, -4];
console.log(nums.sort((a, b) => { return a - b; }));
// nums = [4, -9, -13, -9, 0, -12, 12, -14, 12, 1, 3, 5, 5, 8, 2, -2, 8, 1, 2, -6, -6, 1, 6, -15, -2, 7, -11, 3, -2, 1, 11, 10, 8, 14, 8, -15, 9, 5, -14, 6, 14, -3, -12, 4, -10, 5, -12, 13, 14, -3, -15, -7, 5, -2, -15, 10, -10, 11, -2, -5, -2, -5, -10, 13, -14, 14, 13, 2, 4, 7, -6, 3, 11, -3, -15, -14, 10, 10, 6, 1, -8, -2, 1, 12, 11, 1, 7, 8, -10, 13, -11, 3, -15, -6, -7, 8, -7, 13, -5, 5, -3, 4, -15, -7, 9, -15, -14, -4, 2, 0, 4, 9, 13, -10, -2, 10]
console.log(threeSum(nums));
