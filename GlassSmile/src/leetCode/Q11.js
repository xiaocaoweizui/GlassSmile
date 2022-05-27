/*
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

 

示例 1：

输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
示例 2：

输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/4sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => { return a - b });

    /*
        nums的长度len
        堆栈，定一个一个4个元数据的堆栈。
        1、选择nums第一个，压入栈。
        2.1 判断栈内数据之合是否等于target
        2.2 小于，当栈内元素小于4个时，
            2.2.1 取栈顶元数据所属数组位置+1的元素，再压入栈。如果改元数据不存在，则终止
            2.2.2 等于4个，则出栈一个元素A，取A元数据属数组位置+1的元素，压入栈。
            2.2.3 当前A元数据属数组位置位于数组最后一个元素时，则再出栈一个元数据B，
            取B所在数组位置+1的元数据,如果B+1元素也是最后一个元数据，则再出栈一个，入栈。转到2.2.1
        2.3 大于，直接终止
        2.4 等于，取出数据来放入数组，放入前判断是否存在重复数据
        2.5 
        3 再循环到2.1 进行判断
        
    */
    var len = nums.length;
    var ret = [];
    var stack = [];

    stack[0] = { value: nums[0], pos: 0 };

    while (stack.length > 0) {
  
        var sum = 0;
        for (var i = 0; i < stack.length; i++) {
            sum += stack[i].value;
        }

        var item = stack[stack.length - 1];
        if (stack.length < 4) {
            if (item.pos == len - 1) {
                stack.pop();
                item = stack.pop();
            }

        } else if (stack.length == 4) {

            if (sum == target) {
                var flag = false;
                for (var n = 0; n < ret.length; n++) {
                    if (ret[n][0] == stack[0].value
                        && ret[n][1] == stack[1].value
                        && ret[n][2] == stack[2].value
                        && ret[n][3] == stack[3].value) {
                        flag = true;
                        continue;
                    }
                }
                if (!flag) { ret.push([stack[0].value, stack[1].value, stack[2].value, stack[3].value]); }
            }

            stack.pop();
            if (item.pos == len - 1) {
                item = stack.pop();
            }

        }

        if (item != undefined) { stack[stack.length] = { value: nums[item.pos + 1], pos: item.pos + 1 }; }

    }
    return ret;

};

var nums = [1, 0, -1, 0, -2, 2];
//nums = [2, 2, 2, 2, 2]
//nums=[0,0,0,0];
//nums = [1, -2, -5, -4, -3, 3, 3, 5];
//var target = -11;
target = 0;

var ret = fourSum(nums, target);
console.log(ret);

