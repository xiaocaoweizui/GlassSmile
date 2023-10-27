/**
 * 请你编写一段可应用于所有数组的代码，使任何数组调用 array. groupBy(fn) 方法时，它返回对该数组 分组后 的结果。

数组 分组 是一个对象，其中的每个键都是 fn(arr[i]) 的输出的一个数组，该数组中含有原数组中具有该键的所有项。

提供的回调函数 fn 将接受数组中的项并返回一个字符串类型的键。

每个值列表的顺序应该与元素在数组中出现的顺序相同。任何顺序的键都是可以接受的。

请在不使用 lodash 的 _.groupBy 函数的前提下解决这个问题。

 

示例 1：

输入：
array = [
  {"id":"1"},
  {"id":"1"},
  {"id":"2"}
], 
fn = function (item) { 
  return item.id; 
}
输出：
{ 
  "1": [{"id": "1"}, {"id": "1"}],   
  "2": [{"id": "2"}] 
}
解释：
输出来自函数 array.groupBy(fn)。
分组选择方法是从数组中的每个项中获取 "id" 。
有两个 "id" 为 1 的对象。所以将这两个对象都放在第一个数组中。
有一个 "id" 为 2 的对象。所以该对象被放到第二个数组中。
示例 2：

输入：
array = [
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9]
]
fn = function (list) { 
  return String(list[0]); 
}
输出：
{ 
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]] 
}
解释：
数组可以是任何类型的。在本例中，分组选择方法是将键定义为数组中的第一个元素。
所有数组的第一个元素都是1，所以它们被组合在一起。
{
  "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]
}
示例 3：

输出：
array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
fn = function (n) { 
  return String(n > 5);
}
输入：
{
  "true": [6, 7, 8, 9, 10],
  "false": [1, 2, 3, 4, 5]
}
解释：
分组选择方法是根据每个数字是否大于 5 来分割数组。
 * 
 * 
 */

/**
 * @param {Function} fn
 * @return {Array}
 */
Array.prototype.groupBy = function(fn) {
   var ret={};
    this.forEach(item=>{
        var key=fn(item);
        if(ret[key]==undefined){
            ret[key]=[item];
        }else{
            ret[key].push(item);
        }
    })
    return ret;
   
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */

console.log([1,2,3].groupBy(String));

var array = [
    [1, 2, 3],
    [1, 3, 5],
    [1, 5, 9]
  ];

 var fn = function (list) { 
    return String(list[0]); 
  }

  console.log(array.groupBy(fn)) ;