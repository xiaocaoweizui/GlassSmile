let target="";

/*
    获取 13 
    参数：数量
 */
var getGemOf13=function (num){
    let price =7;

    let count= Math.pow(2,12 -1);
    console.log(`the count  is :${count}`);

    console.log(`the totalAmount  is :${count * price}`);

   
}

var getThunderGem=function(level,num){
    if(level<=8){
        return 0;
    }

   let price=3.75;
   let count=Math.pow(2, level-8) -1;
   console.log(`the count  is :${count}`);
   console.log(`the totalAmount  is :${count * price}`);

   return count * price;

}

var amount=Math.pow(2,1);

// console.log(`the amount :${amount}`);

getGemOf13(3);

 getThunderGem(12) -getThunderGem(11);

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

getLawOfLevel(4);


 var ret=0.5*89;
 console.log(`the ret is :${ret}`);


 // 泡泡 700w
 // 夜叉 250w
 // 简易武器 300w
 // 简易衣服 200w
// 9JN珍露 300w