//迭代器
//ES5的迭代器,实现原理如下
function createIterator(items) {
    var i = 0;

    return {
        next: function () {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = createIterator([1, 2, 3]);
console.log(iterator.next());//{ done: false, value: 1 }
console.log(iterator.next());//{ done: false, value: 2 }
console.log(iterator.next());//{ done: false, value: 3 }
console.log(iterator.next());//{ done: true, value: undefined }

//ES6 引入生成器：一种返回迭代器的函数。通过function 关键字后面的星号（*）来表示
//新的关键字 yield： 指定掉欧阳那个迭代器的next()方法时的返回值以及返回顺序
//例如上面的例子，可以改写
function* createIteratorES6() {
    yield 1;
    yield 2;
    yield 3
};

var iteratorES6 = createIteratorES6();
console.log(iteratorES6.next());//{ value: 1, done: false }
console.log(iteratorES6.next());//{ value: 2, done: false }
console.log(iteratorES6.next());//{ value: 3, done: false }
console.log(iteratorES6.next());//{ value: undefined, done: true }

/*
let createIteratorES6_2=function *(items)
...
*/
//不能用箭头函数创建生成器
function* createIteratorES6_2(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}
var iteratorES6 = createIteratorES6_2([1, 2, 3]);
console.log(iteratorES6.next());//{ value: 1, done: false }
console.log(iteratorES6.next());//{ value: 2, done: false }
console.log(iteratorES6.next());//{ value: 3, done: false }
console.log(iteratorES6.next());//{ value: undefined, done: true }

//另类的使用
let o = {
    *createIterator(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
}
let itera = o.createIterator([1, 3, 4]);

//for-of, 可迭代的对象（所有集合和字符串）
let values = [1, 3, 4]
for (let num of values) {
    console.log(num);
}

//可以使用默认的迭代器 Symbol.iterator
let defaultIterator = values[Symbol.iterator]();
console.log(defaultIterator.next());//{ value: 1, done: false }
console.log(defaultIterator.next());//{ value: 3, done: false }
console.log(defaultIterator.next());//{ value: 4, done: false }
console.log(defaultIterator.next());//{ value: undefined, done: true }

//可以检测对象是否存在 Symbol.iterator 属性判断对象是否可迭代
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}

console.log(isIterable("Hello"));//true

//通过给对象 增加一个 Symbol.iterator属性的迭代生成器，让对象可迭代
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}
collection.items.push(1);
collection.items.push(3);
collection.items.push(4);

for (let x of collection) {
    console.log(x);
}

//集合对象的迭代器： entries,values,keys
let colors = ["red", "green", "blue"];
let tracking = new Set([123, 434, 555]);
let data = new Map([["title", "ES6"], ["font", "Micso YeHei"], ["Author", "zhangy04"]]);

for (let en of colors.entries()) {
    console.log(en);
}

for (let en of tracking.entries()) {
    console.log(en);
}

for (let en of data.entries()) {
    console.log(en);
}

for (let en of colors.values()) {
    console.log(en);
}

for (let en of tracking.values()) {
    console.log(en);
}

for (let en of data.values()) {
    console.log(en);
}

/*
    Set集合的默认迭代器 values
    Map集合的默认迭代器 entries
    数组的默认迭代器 values
*/
for (let en of colors) {
    console.log(en);
}

for (let en of tracking) {
    console.log(en);
}

for (let en of data) {
    console.log(en);
}

// 解构 语法 和 for-of 一起使用
for (let [key, value] of data) {
    console.log(key + "  " + value);
}

//高级迭代器
//如果给迭代器的next()方法传递参数，则这个参数的值会替代生成器内部上一条yield语句的返回值
function* createIteratorHigh() {
    let first = yield 1;
    let second = yield first + 2;
    yield second * 3;
}

let iteraHigh=createIteratorHigh();
console.log(iteraHigh.next());
console.log(iteraHigh.next(4));//4+2=6
console.log(iteraHigh.next(5));//5*3=15

//第一次调用next时，无论传递什么都会被丢弃

