// 创建者： zhangy04

/******* 继承***********/
function inheritObject(o) {
    function f() { };
    f.prototype = o;
    return new f();
};

/*** 寄生式继承 继承原型
* 传递参数 subClass 子类
* 传递参数 superClass 父类
**/
function inheritPrototype(subClass, superClass) {
    var p = inheritObject(superClass.prototype);
    //因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subClass;
    subClass.prototype = p;
}

/******* 继承 ***********/
var MIN_PACE = 20;
var MAX_WIDTH = 400;
var MIN_WIDTH = 0;
var MAX_HEIGHT = 600;
var MIN_HEIGHT = 0;

window.onload = function () {

    var game = new Game();
    game.play();

};


var colors = [
      "#252525"
]
//********* 画笔类 *******/
var Pen = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var color ="#252525"// colors[Math.floor(Math.random() * 5 + 1)];
    return {
        drawBlock: function (xPos, yPos, width, height) {
            context.lineWidth = 1;
            context.fillStyle = color;
            context.fillRect(xPos, yPos, width, height);
            //context.strokeStyle = "rgba(0,0,255,0.25)";
            //context.strokeRect(xPos, yPos, width, height);
        },
        clearRect: function (xPos, yPos, width, height) {
            context.clearRect(xPos, yPos, width, height);
        }
    }

};

//******** 画笔类 *****************/


/******* 小方块 ***********/
var block = function (xPos, yPos) {
    var pace_x = MIN_PACE;
    var pace_y = MIN_PACE;
    var pos = {
        x: xPos || 0,
        y: yPos || 0
    };
    var move = function (ox, oy) {
        pos.x += ox - 0;
        pos.y += oy - 0;
    };
    var pen = new Pen();
    return {
        draw: function () {
            pen.drawBlock(pos.x, pos.y, pace_x, pace_y);
        },
        clear: function () {
            pen.clearRect(pos.x, pos.y, pace_x, pace_y);
        },
        move: function (type) {
            switch (type) {
                case "down":
                    pos.y += 0 + pace_y;
                    break;
                case "left":
                    pos.x += 0 - pace_x;
                    break;
                case "right":
                    pos.x += pace_x;
                    break;
            }
        },
        speedDown: function () {
            pos.y += pace_y * 2;
        }
    }
};


/******* 砖元素 ***********/

//原型砖
var brick = function (xPos, yPos) {
    this.pos = this.pos || {
        x: xPos || MAX_WIDTH / 2 - 40,
        y: yPos || 0
    };
    this.shape = this.shape || [[0, 0], [0, 0]];
    this.blocks = [];
    var _me = this;

    this.init = function (that) {
        var arrShape = that.shape;
        that.blocks = [];
        for (var i = 0; i < arrShape.length; i++) {
            for (var j = 0; j < arrShape[i].length; j++) {
                if (arrShape[i][j] == 1) {
                    var b = new block(that.pos.x +j * MIN_PACE, that.pos.y + i * MIN_PACE);
                    that.blocks.push(b);
                }
            }
        }
    };
    this.init(_me);
};
brick.prototype = {
    load: function () {
        this.init.call(this, this);
    },
    shapeRotate90:function(){
        var arrShape = this.shape;
        var newShape = [];
        //顺时针旋转90度
        for (var j = 0; j < arrShape[0].length; j++) {
            newShape[j] = [];
            for (var i = arrShape.length - 1; i >= 0; i--) {
                newShape[j].push(arrShape[i][j]);
            }
        }
        return newShape;
    },
    rotate90: function () {
        this.shape = this.shapeRotate90();
    },
    draw: function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw();
        };
    },
    clear: function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].clear();
        };
    },
    move: function (type) {
        switch (type) {
            case "down":
                this.pos.y += 0 + MIN_PACE;
                break;
            case "left":
                this.pos.x += 0 - MIN_PACE;
                break;
            case "right":
                this.pos.x += MIN_PACE;
                break;
        }

        this.clear();
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].move(type);
        };

        this.draw();

    },
    speedDown: function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].speedDown(type);
        }
    },
    change: function () {
        this.clear();
        this.rotate90();
        this.load();
        this.draw();
    }
};


//“Z”形砖
var Z_brick = function (xPos, yPos) {
    this.shape = [[1, 1, 0],
                  [0, 1, 1]];
    brick.call(this, xPos, yPos);
};
inheritPrototype(Z_brick, brick);

//反“Z”形砖
var RZ_brick = function (xPos, yPos) {
    this.shape = [[0, 1, 1],
                  [1, 1, 0]];
    brick.call(this, xPos, yPos);
};

inheritPrototype(RZ_brick, brick);


//“田”形砖
var O_brick = function (xPos, yPos) {
    this.shape = [[1, 1],
                  [1, 1]];
    brick.call(this, xPos, yPos);
};
inheritPrototype(O_brick, brick);


//“I”形砖
var I_brick = function (xPos, yPos) {
    this.shape = [[1], [1], [1], [1]];
    brick.call(this, xPos, yPos);
};
inheritPrototype(I_brick, brick);



//“L”形砖
var L_brick = function (xPos, yPos) {
    this.shape = [[1, 0],
                 [1, 0],
                 [1, 1]];
    brick.call(this, xPos, yPos);
};
inheritPrototype(L_brick, brick);

//反“L”形砖
var RL_brick = function (xPos, yPos) {
    this.shape = [[0, 1],
                 [0, 1],
                 [1, 1]];
    brick.call(this, xPos, yPos);
};

inheritPrototype(RL_brick, brick);

//“T”形砖
var T_brick = function (xPos, yPos) {
    this.shape = [[0, 1, 0],
                 [1, 1, 1]];
    brick.call(this, xPos, yPos);
};
inheritPrototype(T_brick, brick);



var BrickFactory = function () {
    var total = 7;
    var type = Math.floor(Math.random() * total + 1);
    switch (type) {
        case 1:
            return new Z_brick();
            break;
        case 2:
            return new O_brick();
            break;
        case 3:
            return new I_brick();
            break;
        case 4:
            return new L_brick();
            break;
        case 5:
            return new T_brick();
            break;
        case 6:
            return new RZ_brick();
            break;
        case 7:
            return new RL_brick();
            break;
    }
}



/********* 计分器 ************/
var PointCounter = function () {
    var num = 0;
    var setValue = function () {
        var spnNum = $("#spnNum");
        spnNum.text(num);
    }
    //一行1分, 二行3分, 3行7分, 4行15分

    var pointerRule = [0,1, 3, 7, 15];
    return {
        //得分
        getPoint: function (type) {
            num += pointerRule[type];
            setValue();
        },
        getLevel: function () {
            return 0;
        },
        getValue: function () {
            return num;
        }
    };
};

/********* 堆积堆 ************/
var MAP_RATE = 1 / 20;//图的比例
var Map = function () {
    var map = [];
    var pen = new Pen();
    var counter = new PointCounter();
    var cols = MAX_WIDTH * MAP_RATE;
    var rows = MAX_HEIGHT * MAP_RATE;
    var speed = 500;
    this.init = function (that) {
        var len = rows, width = cols;
        for (var i = 0; i < len; i++) {
            var arr = [];
            for (var j = 0; j < width; j++) {
                arr.push(0);
            }
            map.push(arr);
        };
    };

    var _me = this;
    //初始化地图，全为0的二维矩阵
    this.init(_me);

    var m = {
        map:map,
        //判断小方块在地图上是否移动
        isCanMove: function (curBrick, type) {
            var iCol = Math.floor(curBrick.pos.x * MAP_RATE);
            var iRow = Math.floor(curBrick.pos.y * MAP_RATE);
            var sRow = curBrick.shape.length;
            var sCol = curBrick.shape[0].length;
            var arrShape = curBrick.shape;
            switch (type) {
                case "down":
                    if (iRow + sRow >= rows) { return false; }
                    for (var i = 0; i < sRow; i++) {
                        for (var j = 0; j < sCol; j++) {
                            if (arrShape[i][j] + this.map[iRow + 1 + i][iCol + j] > 1) {
                                return false;
                            }
                        }
                    }
                    break;
                case "left":
                    if (iCol == 0) { return false; }
                    for (var i = 0; i < sRow; i++) {
                        for (var j = 0; j <sCol; j++) {
                            if (arrShape[i][j] + this.map[iRow + i][iCol - 1 + j] > 1) {
                                return false;
                            }
                        }
                    }
                    break;
                case "right":
                    if (iCol + sCol >= cols) { return false; }
                    for (var i = 0; i < sRow; i++) {
                        for (var j = 0; j < sCol; j++) {
                            if (arrShape[i][j] + this.map[iRow + i][iCol + 1 + j] > 1) {
                                return false;
                            }
                        }
                    }
                    break;
            }
            return true;
        },
        //判断小方块在地图上是否可以旋转
        isCanChange: function (curBrick) {
            var iCol = Math.floor(curBrick.pos.x * MAP_RATE);
            var iRow = Math.floor(curBrick.pos.y * MAP_RATE);
            var arrShape = curBrick.shapeRotate90();
            if (iRow + arrShape.length > rows) { return false };
            if (iCol + arrShape[0].length > cols) { return false };

            for (var i = 0; i < arrShape.length; i++) {
                for (var j = 0; j < arrShape[i].length; j++) {
                    if (this.map[iRow + i][iCol + j] + arrShape[i][j] > 1) {
                        return false;
                    }
                }
            }
            return true;
        },
        //将当前方块放到地图中
        add: function (curBrick) {
            var iCol = Math.floor(curBrick.pos.x * MAP_RATE);
            var iRow = Math.floor(curBrick.pos.y * MAP_RATE);
            var arrShape = curBrick.shape;
            for (var i = 0; i < curBrick.shape.length; i++) {
                for (var j = 0; j < curBrick.shape[i].length; j++) {
                    this.map[iRow + i][iCol + j] += arrShape[i][j];
                }
            }
            this.moveRow();
        },
        // 当一行都被方格子填满后，移除当前行
        moveRow: function () {
            var isReDraw = false;
            var rowCountInOne = 0;//相连消除的行数
            for (var i = 0; i < rows; i++) {
                var sum = 0;
                var arrEmpty = [];
                for (var j = 0; j < cols; j++) {
                    sum += this.map[i][j];
                    arrEmpty.push(0);
                }
                if (sum == cols) {
                    map.splice(i, 1);
                    map.unshift(arrEmpty);
                    isReDraw = true;

                     rowCountInOne++;
                }
                else {
                    if (rowCountInOne) {
                        counter.getPoint(rowCountInOne);
                        rowCountInOne = 0;
                    }
                }
            }
            if (isReDraw) {
                this.reDraw();
                counter.getPoint(rowCountInOne);

                this.speedUp();
            };
            
        },
        // 根据时间推移，增加方块的下降速度
        speedUp:function(){
            var point = counter.getValue();
            switch (point) {
                case point < 5:
                    speed = 500;
                    break;
                case point < 10:
                    speed: 400
                    break
                case point < 20:
                    speed: 300
                    break
                case point < 30:
                    speed: 200
                    break
                case point < 40:
                    speed: 200
                    break
                case point < 50:
                    speed: 100
                    break
            }
        },
        reDraw: function () {
            pen.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (this.map[i][j] == 1) {
                        pen.drawBlock(j / MAP_RATE, i / MAP_RATE, MIN_PACE, MIN_PACE)
                    }
                }
            }
        }
    };

    return m;
};



/***   Game  ****/
var Game = function () {
    var map = new Map();
    var timer = null;
    var curBrick = new BrickFactory();
    var status = "stop";
    var speed = 500;
    var move = function (type) {
        if (status != "play") {
            return;
        }
        if (map.isCanMove(curBrick, type)) {
            curBrick.move(type);
        } 
    };
    var autoDown = function () {
        if (status != "play") {
            return;
        }
        if (map.isCanMove(curBrick, "down")) {
            curBrick.move("down"); 
        } else {
            map.add(curBrick);
            curBrick = new BrickFactory();
            //当新生成的方块都不能动的时候，游戏结束
            if (!map.isCanMove(curBrick, "down")
                && !map.isCanMove(curBrick, "left")
                && !map.isCanMove(curBrick, "right")
                ) {
                curBrick.draw();
                game.over();
            }
        }

        setTimeout(autoDown, speed);
    }
  

    var game = {
        over: function () {
            status = "over";
            alert("GAME OVER!");
        },
        pause: function () {
            status = "pause";
        },
        play: function () {
            status = "play";
            curBrick.draw();
            setTimeout(autoDown, speed)
        },
        down: function () {
            move("down");
        },
        left: function () {
            move("left");
        },
        right: function () {
            move("right");
        },
        change: function () {
            if (status != "play") {
                return;
            }
            if (map.isCanChange(curBrick)){
                curBrick.change();
            }
        },
        useTool: function () { },
        set: function () { }
    };

    document.onkeydown = function (e) {
        var e = e || window.event || arguments.callee.caller.arguments[0];

        switch (e.keyCode) {
            case 32:
                //空格变化
                game.change();
                break;
            case 37:
                //向左
                game.left();
                break;
            case 39:
                //向右
                game.right();
                break
            case 40:
                //向下：
                game.down();
                break;
            case 80: //"P"键
                game.pause();
                break
            case 69: //"E"键
                game.pause();
                break
            case 82: //"R"键
                game.play();
                break
        }
    };

    return game;

};


