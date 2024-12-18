/*
给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

 

示例 1：

输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
示例 2：

输入：nums = [0,0,0], target = 1
输出：0
 

提示：

3 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-104 <= target <= 104

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {

    /*
        最接近可以理解为 两个数值的绝对值最小
        1、可以先排序好
        2、取前三个数，求合sum，和target比较，如果sum<target,则第三位往后移动一位
            当第三位移动不了了，则移动第二位
            当第二位移动不了了，则移动第一位
            当第二个也移动不了，则得到最后的值
        3、如果sum=target,得到解
        4、如果sum>target，比较上个一个tagert-sum的值和本次sum-target的值谁小，则取谁
    */

    //从小到大排序好
    nums.sort((a, b) => { return a - b; });

    console.log(`this nums is :${nums}`)

    var result = null;
    var length = nums.length;
    var sum = null;
    var minDest = null;
    for (var i = 0; i < length - 2; i++) {
        var a = nums[i];
        if (i > 0 && a == nums[i - 1]) {
            continue;
        }
        var startIndex = i + 1;
        var endIndex = length - 1;

        
        while (endIndex > startIndex) {

            sum = a + nums[startIndex] + nums[endIndex];

            if (sum == target) {
                return sum;
            }
            if (minDest == null) {
                minDest = Math.abs(sum - target);
                result = sum;
            }else if (Math.abs(sum - target) < Math.abs(minDest)) {
                minDest = Math.abs(sum - target);
                result = sum;
            }

            // console.log(`${a},${nums[startIndex]}, ${nums[endIndex]}; the minDest is ${minDest}, the result is ${result}`)

            if (sum < target) {
                var temp = startIndex + 1;
                while (temp < endIndex && nums[temp] == nums[startIndex]) {
                    temp++;
                }
                startIndex = temp;
            } else {
                var temp = endIndex - 1;
                while (temp > startIndex && nums[temp] == nums[endIndex]) {
                    temp--;
                }
                endIndex = temp;
            }
            // console.log(`${a};${nums[startIndex]},${nums[endIndex]}; ${min}`)
            // console.log(`this closet :${tempMid},the min is ${min}`)
        }
    }
    return result;

};

var nums = [-1, 2, 1, -4];
var target = 1; //2


// nums = [4, 0, 5, -5, 3, 3, 0, -4, -5];
// target = -2; //0
// nums = [-23, -67, 32, 21, -65, 46, 73, 42, 93, 9, -61, -79, -51, 61, -15, 49, 92, -34, 50, 1, 26, -12, 68, -97, -17, 51, -55, 75, -56, -95, -70, -42, 91, -18, -64, 20, 33, -20, 19, 61, -89, 81, -73, 82, -23, -65, 51, -88, 15, -48, 24, 34, 0, -24, 37, 22, 28, -67, -25, -61, -57, -74, 65, 50, -66, 24, 99, 80, 44, 85, 20, -4, -9, -81, 87, -82, -100, 51, -83, 9, -31, 37, 23, -61, 53, -14, -51, 88, 56, 27, 42, -52, -97, 37, 36, -59, -45, 95, 46, -1, -100, -38, 66, 44, 27, -97, 12, -43, 84, -53, 93, 18, -40, -38, 34, 85, 53, -50, -14, -6, 98, -77, -17, 50, -65, 52, -46, -94, 49, 72, -2, -82, 45, -39, -58, 67, 82, 63, 95, -32, 47, 15, -20, 46, 5, 17, -40, -95, 97, -9, 11, 8, -51, -24, -50, -37, -72, -57, 26, 26, 19, 71, -42]
// target = -87  //-87

// nums = [1, 1, 1, 0]
// target = -100 //2


// nums=[854,692,673,-175,89,620,566,581,-476,-973,-440,820,684,203,707,828,914,244,-369,-98,25,791,868,-61,19,17,297,389,-338,525,-651,418,708,-335,37,-766,290,-84,-196,-640,-279,231,109,-772,972,499,992,-139,694,797,398,645,895,782,-784,422,449,649,-27,-74,110,621,-568,-707,160,-951,-898,879,135,-317,227,-732,512,-595,-89,484,513,300,267,-585,-478,664,-805,-562,-526,-294,432,90,12,737,-629,-903,904,-957,710,-776,557,-887,-676,77,-272,-847,413,0,465,-253,-91,-397,443,163,-172,-436,309,451,-515,882,-296,-350,-863,212,703,-454,634,-242,-606,-652,990,87,161,368,993,857,891,311,-489,-573,945,-889,702,564,10,-556,-751,-263,-249,-464,-804,-416,672,997,-484,376,327,922,317,261,45,-212,113,584,-725,579,-238,-297,-349,-978,960,784,-584,626,844,-300,-206,-501,907,-913,-492,467,-611,944,390,-765,-572,-2,559,412,357,60,187,127,-505,-875,-623,-418,-118,195,986,303,604,885,-995,344,189,209,897,-661,958,-532,714,931,560,-750,-650,-421,699,-255,-996,-538,438,-173,-266,762,-601,136,67,955,-845,299,-315,592,-229,833,372,555,381,-225,-68,677,-429,929,-228,302,-161,444,-7,415,-304,-29,229,522,961,-728,-696,712,-203,841,-112,-235,99,-126,-512,-932,69,293,834,-202,-473,798,-878,396,-215,830,818,516,199,-267,-753,-656,-152,973,380,-41,-105,642,893,408,248,-63,837,-872,636,450,919,719,-446,-952,-594,709,-861,479,588,50,237,547,-528,-851,-966,123,-278,-657,713,-688,-252,-20,739,387,-561,3,-220,-361,-182,-120,915,-375,354,-86,-644,628,-823,-198,-789,-939,-453,552,174,-706,-672,304,-731,204,242,940,272,655,-962,888,-377,146,-284,593,-543,-451,496,815,-306,407,243,-908,-247,801,-989,-662,-871,228,-854,276,-32,543,-151,693,-157,-935,851,942,-971,787,141,738,-980,275,890,528,-488,924,188,878,32,-124,82,676,352,486,-412,-353,326,-965,-303,-218,-292,437,-862,-58,-733,-578,447,193,-34,-46,40,-310,704,-360,-413,-370,-458,-567,55,115,-257,-113,-103,-373,-915,48,852,-6,-813,42,26,743,-154,-439,866,-632,-382,733,-134,-343,-1,-982,538,950,-827,471,-559,671,-403,-181,-236,-237,-643,27,982,-467,-739,-107,921,568,-757,-627,-410,-434,21,-322,-428,619,166,-682,903,-372,660,-620,736,610,-423,230,-221,-400,-398,-130,-625,-394,943,164,-563,75,120,220,-183,-993,745,-383,430,-704,-506,-673,-437,-941,567,-540,527,994,347,182,13,746,574,405,989,-305,490,-876,936,111,-185,143,999,763,-376,-865,-734,281,-833,409,367,-841,8,-873,-461,-641,-645,-816,493,-748,154,-328,-738,-406,-100,-669,306,-744,991,49,-791,695,234,-579,339,836,781,-316,796,913,205,561,-859,-447,880,97,287,892,469,-892,473,7,-746,-472,689,-81,840,-694,-408,-216,-779,-815,-773,-320,-204,623,-589,965,-94,542,721,-517,-794,-968,-718,392,-285,-832,179,373,133,-424,-493,-582,211,-287,280,-456,459,310,502,870,-327,-342,-992,320,-884,511,690,-547,416,969,-193,-549,-455,633,505,-803,-758,442,839,386,700,954,-877,-638,271,-922,-975,119,-51,-384,-705,-610,334,-379,-508,64,-121,716,315,685,964,-780,959,324,883,938,-22,1000,553,-560,-321,-281,-577,-88,-393,988,932,210,-940,446,-927,171,-810,-984,-170,-463,-870,-660,-821,659,-537,-911,824,847,264,29,-880,200,749,-414,509,-590,573,337,-690,727,148,886,363,-490,38,436,-553,-979,-719,-977,535,747,455,556,947,-460,-721,-986,-837,291,-319,-115,-289,-797,875,62,-946,5,286,923,-276,397,117,-312,-555,-730,-836,247,421,23,-246,754,46,-217,-649,260,364,-189,-40,901,-433,328,766,-771,269,-147,424,668,549,-178,-404,809,846,371,-548,-778,270,-552,-158,-740,-500,-357,128,232,384,-510,388,196,273,-502,-9,-724,295,-654,-527,-311,-860,-796,-701,80,-35,191,-542,691,-474,-179,-597,-988,-427,-330,-497,348,-487,-604,-760,-240,646,487,-550,108,263,259,-879,853,722,-52,301,925,995,404,759,-337,799,-57,79,-961,282,-18,-47,-140,-580,755,94,778,-430,-830,-558,-648,130,-605,-48,-697,498,85,15,-918,545,-727,86,933,-176,887,-907,825,-570,-825,632,-274,794,169,572,162,757,454,-954,-104,-50,-678,-1000,-271,-480,-286,370,168,813,744,-371,-495,-518,-628,-137,686,95,427,298,-66,583,-624,-65,448,441,-663,-470,181,296,-536,312,600,81,-415,-671,-102,83,9,-646,-275,333,-282,-716,-575,732,-101,-85,116,-69,-664,-194,461,742,165,100,-162,488,245,-211,504,682,898,-929,734,-83,-49]
// target=4739 //2996

// nums = [13, 252, -87, -431, -148, 387, -290, 572, -311, -721, 222, 673, 538, 919, 483, -128, -518, 7, -36, -840, 233, -184, -541, 522, -162, 127, -935, -397, 761, 903, -217, 543, 906, -503, -826, -342, 599, -726, 960, -235, 436, -91, -511, -793, -658, -143, -524, -609, -728, -734, 273, -19, -10, 630, -294, -453, 149, -581, -405, 984, 154, -968, 623, -631, 384, -825, 308, 779, -7, 617, 221, 394, 151, -282, 472, 332, -5, -509, 611, -116, 113, 672, -497, -182, 307, -592, 925, 766, -62, 237, -8, 789, 318, -314, -792, -632, -781, 375, 939, -304, -149, 544, -742, 663, 484, 802, 616, 501, -269, -458, -763, -950, -390, -816, 683, -219, 381, 478, -129, 602, -931, 128, 502, 508, -565, -243, -695, -943, -987, -692, 346, -13, -225, -740, -441, -112, 658, 855, -531, 542, 839, 795, -664, 404, -844, -164, -709, 167, 953, -941, -848, 211, -75, 792, -208, 569, -647, -714, -76, -603, -852, -665, -897, -627, 123, -177, -35, -519, -241, -711, -74, 420, -2, -101, 715, 708, 256, -307, 466, -602, -636, 990, 857, 70, 590, -4, 610, -151, 196, -981, 385, -689, -617, 827, 360, -959, -289, 620, 933, -522, 597, -667, -882, 524, 181, -854, 275, -600, 453, -942, 134]
// target = -2805 //-2714

console.log(`this result is : ${threeSumClosest(nums, target)}`)