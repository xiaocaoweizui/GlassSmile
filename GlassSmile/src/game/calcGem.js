let target="";

/*
    获取 13
    参数：数量
 */
var getGem=function (num){
    let price =7;

    let count= Math.pow(2,num -1);
    console.log(`the Gem of level  ${num} need gem of level 1  :${count} ` );

    console.log(`the Gem of level  ${num}  costs :${count * price}`);
}

var getThunderGem=function(level){
    if(level<=8){
        return 0;
    }

   let price=3.75;
   let count=0;

    for(var i=0;i<level-8;i++){
      count=count *2 + Math.pow(2, i)
    }

   console.log(`the  level ${level} Gem needs  ${count}  Gem thunder`);
   console.log(`the  level ${level} Gem  costs :${count * price}`);

   return count * price;

}

var amount=Math.pow(2,1);

// console.log(`the amount :${amount}`);

getGem(13);
getThunderGem(13);
getGem(12);
getThunderGem(12);


// getThunderGem(13);
//金币：从12段升到13段，需要 48个锤子，按一个3.75万，需要 180w
//银币：14336万

getGem(12);
getThunderGem(12);
getGem(11);
getThunderGem(11);
/*
 金币：从11到12段需要 20个锤子，按一个3.75万，需要 75w
 银币：7168w
 */


 /*
 what's is left?
 */
var getLawOfLevel=function(level){
    var price=30;
    var result=0;
    switch(level){
        case 1:
            result=30*1;
            break;
        case 2:
            result=price*10;
            break;
        case 3:
            result=price*60
            break;
        case 4:
            result=price*150;
            break
        case 5:
            result=price*300;
            break
    }

    console.log(`the amount is :${result}`);

    return result;


};

// getLawOfLevel(4);


 // var ret=0.5*89;
 // console.log(`the ret is :${ret}`);


//6JN 嘲讽僵尸 350w
//6JN 老鼠 700w 已经达成


/*
  从全身11段到 4个13段，2个12段
  整体耗费：
    1、272个锤子（合计:1020w）
    2、100352w银币(约等于 10亿)
    3、117天 （3-15开始，7-10结束）
  属性提升：
    1、法伤：+48
    2、防御: +24

  先阶段差距：
    1、0个锤子
    2、3个8级宝石 3*880=2640w
 */


/*
*
* 4个13段，1000万 已达成
* 3个神兽：2100万 已达成
* 3 个简易装备：500万 已达成
* 3 个宝宝（御风+芙蓉）：350万
*
* */
