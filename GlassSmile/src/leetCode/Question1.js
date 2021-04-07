/*
 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的每个数字在每个组合中只能使用一次。
 说明：
    所有数字（包括目标数）都是正整数。
    解集不能包含重复的组合。 
 输入: candidates = [10,1,2,7,6,1,5], target = 8,所求解集为:[[1, 7],[1, 2, 5],[2, 6], [1, 1, 6]]。

 https://leetcode-cn.com/problems/combination-sum-ii/
*/

var combinationSum2 = function (candidates, target) {
    var len = candidates.length;
    candidates.sort(function (a, b) { return a - b; });
    var ret=[];
    var stack = [];
    var num = 0;
    var index = 0;

    while (num < target && index < len) {
        stack.push({ pos: index, val: candidates[index] });
        num += candidates[index];
        if (num >= target || index==len-1) {
            if (num == target) {
                var retArr = [];
                for (var i = 0; i < stack.length; i++) {
                    retArr.push(stack[i].val);
                }
                var isExist=false;
                for(var j=0;j<ret.length;j++){
                    if(ret[j].toString()==retArr.toString()){
                        isExist=true;
                        continue;
                    }
                }
               if(!isExist){ret.push(retArr);} 
            }
            if (stack.length > 0) {
                var t = stack.pop();
                num -= t.val;
                index = t.pos;
            }
            if (stack.length > 0) {
                var t = stack.pop();
                num -= t.val;
                index = t.pos;
            }
        }
        index++;
    }
    return ret;
};

var candidates = [10, 1, 2, 7, 6, 1, 5];
 var target = 8;
var ret= combinationSum2(candidates, target);
console.log(ret);


var arr=[3,1,3,5,1,1];
var ret= combinationSum2(arr, target);
console.log(ret);