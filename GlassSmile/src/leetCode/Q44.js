/**
 * 42. 接雨水
困难
4.8K
相关企业
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

 

示例 1：



输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9
 

提示：

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
 * 
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    /**
     * 思路：
     *   接的雨水数 实际可以看出是两个面积相减得到的值
     *  面积A:取整个金字塔的所有面积area,从头遍历height,
     *  面积B:height柱子的面积
     *  采用双指针的逻辑
     *   posLeft 简写 l=0,posRight 简写 r=1
     *      初始化都再pos=0,
     *          遍历r ++
     *              a、如果height[r]>=height[l]>0,则用i遍历l和r直接的值，trap+=height[l] -height[i]
     *                  处理完后，l=r,r=r+1;继续遍历，直到r到达数组尾部
     *              b、如果r到达尾部,记下l1=l, 
     *                  遍历len到l1,r=len-1,l=len-2
     *                      如果height[l]>=height[r]>0，则用i遍历l和r直接的值，trap+=height[l] -height[i]
     */

    var l = 0, r = 1;
    var len = height.length;
    var ret = 0;
    for (; r < len; r++) {
    //    console.log(` r =${r}  height[r]=${height[r]},l=${l} ,height[l]=${height[l]}`);
        if (height[l] == 0) {
            l++;
            r=l;
            continue;
        }

        if (height[r] >= height[l] && height[l] > 0) {
            var pos = l + 1;
            while (pos < r) {
                var val = height[l] - height[pos];
                ret += val < 0 ? 0 : val;
                pos++;
            }
            // console.log(`the ret is ${ret}`);
            l = r;
        }
    }
    var pos = l;
    console.log(`pos :${pos}`)
    for (r = len - 1, l = len - 2; l >= pos; l--) {
        //  console.log(` r =${r}  height[r]=${height[r]},l=${l} ,height[l]=${height[l]}`);
         if (height[r] == 0) {
            r--;
            l=r;
            continue;
        }
        if (height[l] >= height[r] && height[r] > 0) {
            var m = r - 1;
            while (m > l) {
                var val = height[r] - height[m];
                ret += val < 0 ? 0 : val;
                m--;
            }
            //  console.log(`the ret is ${ret}`);
            r = l;
            l = r 
        }
    }
    //  console.log(`the height is ${height}`);
    // console.log(`the result is ${ret}`);
    return ret;

};

var height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
height= [4,2,0,3,2,5];
height=[4,2,3];
height=[4,9,4,5,3,2];
height =[2,6,3,8,2,7,2,5,0]
var ret= trap(height);
console.log(`the result is ${ret}`);
//   1,1,2,1,1,1,3,2,1,2
// 0,1,0,2,1,0,1,3,2,1,2,1