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

window.onload = function () {

    var game = new Game();
    game.play();

};

//惰性单例模式
var BASE_PARAMS = (function () {
    var _instance = null;
    function Single(){
        return {
            params: {
                "unitWidth": 80,
                "panelWidth": 400,
                "panelHeight": 400,
                "cols": 5,
                "rows": 5,
                "pic": document.getElementById("img")
            },
            getParams: function (type) {
                return this.params[type] ? this.params[type] : null;
            }
        };
    }
    return function () {
        if (!_instance) {
            _instance = Single();
        }

        return _instance;
    }
})();


var Pen = function (canvasName) {
    canvasName = canvasName || "myCanvas";
    var canvas = document.getElementById(canvasName);
    var context = canvas.getContext("2d");
    var pic = BASE_PARAMS().getParams("pic");
    var xRate = pic.naturalWidth / pic.clientWidth;
    var yRate = pic.naturalHeight / pic.clientHeight;
    var unitWidth = BASE_PARAMS().getParams("unitWidth");
    return {
        draw: function (sx, sy, x, y) {
            context.drawImage(pic, sx * xRate, sy * yRate, unitWidth * xRate, unitWidth * yRate, x, y, unitWidth, unitWidth);
        },
        clear: function (x, y) {
            context.clearRect(x, y, unitWidth, unitWidth);
        },
        drawBorder: function (x, y) {
            context.strokeStyle = "rgba(0,0,255,0.25)";
            context.strokeRect(x, y, unitWidth, unitWidth);
        }
    }

};

var Unit = function (sx, sy, x, y,myPen) {
    var sPos = {
        sx: sx || 0,
        sy: sy || 0,
        x: x || 0,
        y: y || 0
    };
    var pen = myPen ? myPen : new Pen();
    return {
        pos: sPos,
        draw: function () {
            pen.draw(sPos.sx, sPos.sy, sPos.x, sPos.y);
        },
        clear: function () {
            pen.clear(sPos.x, sPos.y);
        }

    };
}
var PicMap = function () {
    var map = [];
    var selectedUnit = null;
    var currentCanvas = $("#picCanvas")[0];

    var iCols = BASE_PARAMS().getParams("cols");
    var iRows = BASE_PARAMS().getParams("rows");
    var unitWidth = BASE_PARAMS().getParams("unitWidth");

    var pen=new Pen("picCanvas");
    var init = function () {
        //切割图片
        for (var i = 0; i < iRows; i++) {
            var arr = [];
            for (var j = 0; j < iCols; j++) {
                var o = new Unit(j * unitWidth, i * unitWidth, j * unitWidth, i * unitWidth, pen);
                arr.push(o);
            }
            map.push(arr);
        }
        //随机打散图片位置;
        var i=20;
        while (i--) {
            var ranCol1 =Math.floor(Math.random() * iCols);
            var ranRow1 = Math.floor(Math.random() * iRows );

            var ranCol2 = Math.floor(Math.random() * iCols );
            var ranRow2 = Math.floor(Math.random() * iRows );

            var x = map[ranRow1][ranCol1].pos.x;
            var y = map[ranRow1][ranCol1].pos.y;
            map[ranRow1][ranCol1].pos.x = map[ranRow2][ranCol2].pos.x;
            map[ranRow1][ranCol1].pos.y = map[ranRow2][ranCol2].pos.y;
            map[ranRow2][ranCol2].pos.x = x;
            map[ranRow2][ranCol2].pos.y = y;

        };
        //重绘图像
        for (var i = 0; i < iRows; i++) {
            for (var j = 0; j < iCols; j++) {
                map[i][j].draw();
            }
        }

    }

    init();

    return this;
};

var MoveUnit = function () {
    var cvs = $('<canvas id="moveCanvas" ></canvas>');
    cvs.appendTo($("#myCanvas").parent()).css("display", "none");
    var pen = new Pen("moveCanvas");
    var unitWidth = BASE_PARAMS().getParams("unitWidth");
    return {
        onmouseup: function (fn) {
            if (typeof fn == "function") {
                cvs.bind("mouseup", fn);
            }
        },
        clear: function () {
            newPen.clear(0, 0, unitWidth, unitWidth);
        },
        draw: function (sx, sy) {
            newPen.draw(sx, sy, 0, 0);
        },
        show:function(sx,sy,x,y){
            cvs.attr({
                "width": unitWidth,
                "height": unitWidth
            }).css({
                "position": "absolute",
                "left": x + 40,
                "top": y + 40,
                "display": "block",
                "border": "solid 1px red"
            });
            this.clear();
            this.draw(sx, sy);
        },
        move: function (xPos, yPos) {
            cvs.css({
                "left": xPos,
                "top": yPos
            });
        },
        hide: function () {
            cvs.css("display", "none");
        }
    }
}


var ContentMap = function () {
    var map = [];
    var selectedUnit = null;
    var currentCanvas = $("#myCanvas")[0];
    var moveUnit = new MoveUnit();
    var iCols = BASE_PARAMS().getParams("cols");
    var iRows = BASE_PARAMS().getParams("rows");
    var unitWidth = BASE_PARAMS().getParams("unitWidth");
    var init = function () {
        for (var i = 0; i < iRows; i++) {
            var arr = [];
            for (var j = 0; j < iCols; j++) {
                arr.push(null);
            }
            map.push(arr);
        }
        //测试用
        map[0][4] = new Unit(300, 0, 320, 0);
        map[4][0] = new Unit(0, 300, 0, 320);

        //测试用

        $(currentCanvas).bind("mousedown", select);
        $(currentCanvas).bind("mousemove", move);

        moveUnit.onmouseup = unSelect;
    }

  
    var select = function (e) {
        var xPos = e.offsetX;
        var yPos = e.offsetY;

        selPos = getSeletedUintPos(xPos, yPos);
        selectedUnit = map[selPos.row][selPos.col];

        if (!selectedUnit) { return; }
        moveUnit.show(selectedUnit.pos.sx, selectedUnit.pos.sy, selectedUnit.pos.x, selectedUnit.pos.y);

        selectedUnit.clear();

    };
    var unSelect = function (e) {
        var xPos = moveCanvas.css("left").replace("px","");
        var yPos = moveCanvas.css("top").replace("px", "");

        var selPos = getSeletedUintPos(xPos, yPos);

        if (map[selPos.row][selPos.col]!=null) {
            selectedUnit.draw();
            selectedUnit = null;
            moveUnit.hide();
            return;
        };

        var posUint = new Unit(selectedUnit.pos.sx, selectedUnit.pos.sy, selPos.col * unitWidth, selPos.row * unitWidth);
        posUint.draw();

        map[selPos.row][selPos.col] = posUint;

        selectedUnit = null;
        moveUnit.hide();
    };

    var move = function (e) {
        if (!selectedUnit) { return; }

        var xPos = e.offsetX;
        var yPos = e.offsetY;

        moveUnit.move(xPos,yPos);
    }
    var getSeletedUintPos = function (x,y) {
        var col = Math.floor(x / unitWidth);
        var row = Math.floor(y / unitWidth);

        return { col: col, row: row };
    }
    init();
   
}


var Game = function () {
    var curMap = new ContentMap();
    var picMap = new PicMap();
    return {
        play: function () {
            var u = new Unit(300, 0, 320, 0);

            u.draw();

            var u1 = new Unit(0, 300, 0, 320);

            u1.draw();
        }
    }
}