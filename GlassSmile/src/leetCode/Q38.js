/**
 * 骑士在一张 n x n 的棋盘上巡视。在有效的巡视方案中，骑士会从棋盘的 左上角 出发，并且访问棋盘上的每个格子 恰好一次 。

给你一个 n x n 的整数矩阵 grid ，由范围 [0, n * n - 1] 内的不同整数组成，其中 grid[row][col] 表示单元格 (row, col) 是骑士访问的第 grid[row][col] 个单元格。骑士的行动是从下标 0 开始的。

如果 grid 表示了骑士的有效巡视方案，返回 true；否则返回 false。

注意，骑士行动时可以垂直移动两个格子且水平移动一个格子，或水平移动两个格子且垂直移动一个格子。下图展示了骑士从某个格子出发可能的八种行动路线。


示例 1：


输入：grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
输出：true
解释：grid 如上图所示，可以证明这是一个有效的巡视方案。
示例 2：


输入：grid = [[0,3,6],[5,8,1],[2,7,4]]
输出：false
解释：grid 如上图所示，考虑到骑士第 7 次行动后的位置，第 8 次行动是无效的。
 

提示：

n == grid.length == grid[i].length
3 <= n <= 7
0 <= grid[row][col] < n * n
grid 中的所有整数 互不相同
 * 
 */


/**
 * 自己的理解：其实就是象棋里面的马，在这个grid矩阵里面，走路，有且只有一遍的遍历全面的矩阵
 * 
 */
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var checkValidGrid = function (grid) {
    /*
    *检验的逻辑可以理解为：
        1、马的 初始化地址 grid[0][0],所以初始地址必须 grid[0][0]=0
        2、巡检的逻辑： 当前马在这当前位置时，查找马可以走的格子里面，是否存在grid[0][0]+1的值，如果有，位置为A=grid[i][j]，则马移动到A
            同时标识 grid[0][0]=true，表示马已经走过了
        3、当前没有路可以走的时候，遍历grid格子里面是否都是true
    */

    //1、初始化的值必须为0
    if (grid[0][0] != 0) {
        return false;
    }

    let col = grid.length;
    let len = grid[0].length;

    //console.log(`the length: ${len}; the cols :${col}`);

    let x = 0;
    let y = 0;

    let isHasRoad=true;
    let stepCount=1;
    while (isHasRoad) {
        //默认无路可走
        isHasRoad=false;
        //存在8种情况可以走
        if (x + 2 < len && y + 1 < col && grid[x + 2][y + 1] == grid[x][y] + 1) {
            stepCount++;
            //标识当前还有路可以走
            isHasRoad=true;
            x = x + 2;
            y = y + 1;
        } else if (x + 1 < len && y + 2 < col && grid[x + 1][y + 2] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x + 1;
            y = y + 2;
        }
        else if (x >= 1 && y + 2 < col && grid[x - 1][y + 2] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x - 1;
            y = y + 2;
        }
        else if (x >= 2 && y + 1 < col && grid[x - 2][y + 1] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x - 2;
            y = y + 1;
        }
        else if (x >= 2 && y >= 1 && grid[x - 2][y - 1] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x - 2;
            y = y - 1;
        }
        else if (x >= 1 && y >= 2 && grid[x - 1][y - 2] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x - 1;
            y = y - 2;
        }
        else if (x + 2 < len && y >= 1 && grid[x + 2][y - 1] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x + 2;
            y = y - 1;
        }
        else if (x + 1 < len && y >= 2 && grid[x + 1][y - 2] == grid[x][y] + 1) {
            stepCount++;
            isHasRoad=true;
            x = x + 1;
            y = y - 2;
        }
       // console.log(`the step is: ${grid[x][y]}, x is : ${x}；y is :${y}`);
    }
    //判断所有格子都已经走过
    if(stepCount==col*len){
        return true
    }else{
        return false;
    }

};

var grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]];
var ret=checkValidGrid(grid);
console.log(`the result is ${ret}`);

grid = [[0,3,6],[5,8,1],[2,7,4]]
ret=checkValidGrid(grid);
console.log(`the result is ${ret}`);
