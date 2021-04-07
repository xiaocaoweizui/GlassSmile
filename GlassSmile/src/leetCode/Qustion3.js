var ParcelSystem = function () {
    var areas = [];
    var getArea = function (area) {
        for (var i = 0; i < areas.length; i++) {
            if (areas[i].key == area) {
                return areas[i];
            }
        }
    }
    return {
        Init: function (area, volumeNumbers) {
            if (areas.length == 0) {
            } else {
                for (var i = 0; i < areas.length; i++) {
                    if (areas[i].key == area) {
                        return -1;
                    }
                }
            }
            areas.push(
                {
                    key: area,
                    Total: volumeNumbers,
                    LeftCount: volumeNumbers,
                    data: []
                });
            return 1;
        },
        Deposit: function (id, area, volume) {
            var myArea = getArea(area);
            if (myArea == null) {
                return -1;
            }
            var type = volume;
            while (type <= 2 && myArea.LeftCount[type] < 1) {
                type++;
            }
            if (type == 3) {
                return -1;
            } else {
                myArea.data.push({ pos: area, type: type, id: id });
                myArea.LeftCount[type]--;
                return type;
            }
        },
        Retrieve: function (id) {
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                for (var j = 0; j < area.data.length; j++) {
                    var item = area.data[j];
                    if (item.id == id) {
                        area.data.pop(item);
                        area.LeftCount++;
                        return 1;
                    }
                }
            }
            return -1;
        },
        QueryID: function (id) {
            for (var i = 0; i < areas.length; i++) {
                var area = areas[i];
                for (var j = 0; j < area.data.length; j++) {
                    var item = area.data[j];
                    if (item.id == id) {
                        return item.pos;
                    }
                }
            }
            return -1;
        }
    }
}

//用例1
var obj = ParcelSystem();
var result1= obj.Init(1, [3, 4, 1]);
console.log(result1);
var result2=obj.Deposit(3, 1, 2);
console.log(result2);
var result3=obj.QueryID(4);
console.log(result3);
var result4=obj.Retrieve(3);
console.log(result4);

console.log("用例2：")
var obj2 = ParcelSystem();
console.log(obj2.Init(1, [3, 4, 1]));//1
console.log(obj2.Init(1, [1, 1 ,1]));//-1
console.log(obj2.Deposit(3, 1, 2));//2
console.log(obj2.Deposit(3, 4, 2));//-1
console.log(obj2.Deposit(2, 1, 2));//-1
console.log(obj2.Deposit(4, 4, 0));//-1
console.log(obj2.QueryID(3));//1
console.log(obj2.QueryID(4));//-1
console.log(obj2.Retrieve(3));//1
console.log(obj2.Retrieve(1));//-1
console.log(obj2.Init(2,[2,0,2]));//1
console.log(obj2.Deposit(5, 2, 0));//0
console.log(obj2.Deposit(7, 2, 0));//0
console.log(obj2.Deposit(6, 2, 0));//2