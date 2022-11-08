/**
 * 给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。

连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示 val 的绝对值。

请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。

提示：

1 <= points.length <= 1000
-10^6 <= xi, yi <= 10^6
所有点 (xi, yi) 两两不同。
 * 
 */

/**
* @param {number[][]} points
* @return {number}
*/
var minCostConnectPoints = function (points) {
    var costNum = 0;
    var conPoints = [];
    var len = points.length;
    conPoints.push(points[0]);
    points.splice(0, 1);
    //1、分两个组，一个已经连接了的点组A,一个还未连接的点的组B
    //2、初始化化A=[],B=points
    //3、首先从B中取出一个点，如果A=空，则直接放入A
    //4、循环A(当A中点的个数=points.length,结束循环)中的点和B组中的点找到最短路径，以A组的为起点，B组为终点
    //5、找到终点x，放入A，从B组移除。继续4操作
    while (conPoints.length < len) {
        var minCost = 0;
        var minPos = null;
        var yIndex = 0;
        for (var i = 0; i < conPoints.length; i++) {
            var xPos = conPoints[i];
            for (var j = 0; j < points.length; j++) {
                var yPos = points[j];
                var cost = Math.abs(xPos[0] - yPos[0]) + Math.abs(xPos[1] - yPos[1]);
                if (minCost == 0 || cost < minCost) {
                    minCost = cost;
                    minPos = yPos;
                    yIndex = j;
                }
            }
        }
        costNum += minCost;
        conPoints.push(minPos);
        points.splice(yIndex, 1);
    }

    return costNum;
};


var points = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]];

//points = [[2, -3], [-17, -8], [13, 8], [-17, -15]];
var num = minCostConnectPoints(points);
console.log(num);