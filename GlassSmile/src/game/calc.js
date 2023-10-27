let priceOfGem=7;
var calcGem=function(price,count){
    let step=count-1;
    let num=Math.pow(2,step);
    return price*num;
}

var oneNineGem=calcGem(priceOfGem,9);
var oneTenGem=calcGem(priceOfGem,10);
console.log(oneTenGem*11);


let priceOfLaw=40;
var calcLaw=function(priceOfLaw,level){
    switch(level){
        case 3:
            return 60* priceOfLaw;
        case 4:
            return 150* priceOfLaw;
        case 5:
            return 300* priceOfLaw;
    }
}

let level=4;
let fourLaw=calcLaw(priceOfLaw,4);
let threeLaw=calcLaw(priceOfLaw,3);
let fiveLaw=calcLaw(priceOfLaw,5);
console.log(` the five law costs: ${fourLaw + threeLaw + fiveLaw} `);


// console.log((oneTenGem*8 +fourLaw + threeLaw)/300);


//------------------------------------------
let TheUnitedMagicWeapon=10*4.5;
let MainMagicWeapon=0;
let theNeckLace=100;
let WeaponSoul=50;

var sum =TheUnitedMagicWeapon +MainMagicWeapon +theNeckLace +WeaponSoul;

console.log(sum);

var calcCountOfThunder=function(level){
    if(level<9){
        return 0;
    }
     var diff=level-8;
     var num=Math.pow(2,diff) -1;

     var price=3.7;

    console.log(` the count is ${num},the money is ${price* num}`);

     return price* num;

}

calcCountOfThunder(11);


//10-3号7w 10-10:85w 10-16：123w
//10-30号 200w  
//11-30号 420w
//12-30号 650w        




