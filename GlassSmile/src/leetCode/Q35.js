/**
 * 931. 下降路径最小和
中等
273
相关企业
给你一个 n x n 的 方形 整数数组 matrix ，请你找出并返回通过 matrix 的下降路径 的 最小和 。

下降路径 可以从第一行中的任何元素开始，并从每一行中选择一个元素。在下一行选择的元素和当前行所选元素最多相隔一列（即位于正下方或者沿对角线向左或者向右的第一个元素）。
具体来说，位置 (row, col) 的下一个元素应当是 (row + 1, col - 1)、(row + 1, col) 或者 (row + 1, col + 1) 。

 输入：matrix = [[2,1,3],[6,5,4],[7,8,9]]
输出：13
解释： 1 5 7; 1 4 8，为和最小的两条下降路径

https://leetcode.cn/problems/minimum-falling-path-sum/solutions/2338060/xia-jiang-lu-jing-zui-xiao-he-by-leetcod-vyww/
 * 
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    /**
     * 可以采用递归树的逻辑处理。
     * 0、 设置最短路径 shortestPath=max;
     * 1、取二维数组种的第一个数据a[i][j]，其中i=0,j=0，二维数组的行数 len，列数 col，入队 a[i][j];
     * 2、遍历a[i]的相邻节点 ,b[i+1][j-1] 或者 b[i+1][j] 或者 b[i+1][j+1] （其中 j-1>=0,j+1 <= len）,入队列
     * 3、判断i+1 是否为最后一行，如果是，则相加队列值的到pathSum，和shortestPath 比较
     */
    let shortestPathSum = 999999;
    //行数
    let len = matrix.length;

    if (len == 0) { return 0; }
    //列数
    let col = matrix[0].length;


    //遍历第一行
    for (var m = 0; m < col; m++) {
        var shortPath = getShortPath(matrix, 0, m, matrix[0][m]);
        shortestPathSum = shortestPathSum <= shortPath ? shortestPathSum : shortPath;
    }
    return shortestPathSum;

};

function getShortPath(matrix, i, j, pathSum) {
    let len = matrix.length;
    let col = matrix[0].length;

    if (i + 1 == len) {
        return pathSum;
    }

    let leftSum = 99999;
    let rightSum =99999;
    //默认取中间节点
    var shortPath = getShortPath(matrix, i + 1, j, pathSum + matrix[i + 1][j]);

    //判断左边数据
    if (j - 1 >= 0) {
        leftSum = getShortPath(matrix, i + 1, j - 1, pathSum + matrix[i + 1][j - 1]);
    }

    //判断右边数据
    if (j + 1 < col) {
        rightSum = getShortPath(matrix, i + 1, j + 1, pathSum + matrix[i + 1][j + 1]);
    }
    var temp = shortPath > leftSum ? leftSum : shortPath;
    shortPath = temp > rightSum ? rightSum : temp;

    console.log(`shortPath:${shortPath}`)
    return shortPath;
}

var matrix = [[100, -42, -46, -41],
[31, 97, 10, -10],
[-58, -51, 82, 89],
[51, 81, 69, -51]]

matrix=[[2,1,3],
        [6,5,4],
        [7,8,9]];
//var ret = minFallingPathSum(matrix);

var  n = matrix.length;
var dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
dp[0] = [...matrix[0]];
console.log(dp);