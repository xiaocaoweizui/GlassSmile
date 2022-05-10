/*
https://leetcode-cn.com/problems/add-two-numbers/

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
示例 2：

输入：l1 = [0], l2 = [0]
输出：[0]
示例 3：

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
 

提示：

每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// var addTwoNumbers = function (l1, l2) {
//    return addTwoNumbers_2(l1,l2,0);
// };

var addTwoNumbers = function (l1, l2, pre = 0) {
    if (l1 == null && l2 == null) {
        if (pre != 0) {
            return { val: pre, next: null };
        }
        return null;
    }
    var ret = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + pre;
    return {
        val: ret % 10,
        next: addTwoNumbers(l1 != null ? l1.next : null, l2 != null ? l2.next : null, Math.floor(ret / 10))
    }
}

var addTwoNumbers_arr = function (l1, l2) {
    var len = l2.length;
    if (l1.length > l2.length) {
        len = l1.length;
    }
    var arr = [];
    arr[0] = 0;
    for (var i = 0; i < len; i++) {
        var ret = (i < l1.length ? l1[i] : 0) + (i < l2.length ? l2[i] : 0);
        var s = ret % 10;
        var p = Math.floor(ret / 10);
        if (i + 1 < len) {
            arr[i + 1] = arr[i + 1] == undefined ? 0 : arr[i + 1];
        }
        arr[i] += s;
        if (p > 0) {
            arr[i + 1] += p;
        }
    }
    return arr;
};
var l1 = [2, 4, 3], l2 = [5, 6, 4]
var ret = addTwoNumbers_arr(l1, l2);



console.log(` the result of two number added is :${ret}`);

// var objl13 = { val: 3, next: null };
// var objl12 = { val: 4, next: objl13 };
// var objl11 = { val: 2, next: objl12 };

// var objl23 = { val: 4, next: null };
// var objl22 = { val: 6, next: objl23 };
// var objl21 = { val: 5, next: objl22 };


// var objRet = addTwoNumbers_2(objl11, objl21);

var objl17 = { val: 9, next: null };
var objl16 = { val: 9, next: objl17 };
var objl15 = { val: 9, next: objl16 };
var objl14 = { val: 9, next: objl15 };
var objl13 = { val: 9, next: objl14 };
var objl12 = { val: 9, next: objl13 };
var objl11 = { val: 9, next: objl12 };

var objl24 = { val: 9, next: null };
var objl23 = { val: 9, next: objl24 };
var objl22 = { val: 9, next: objl23 };
var objl21 = { val: 9, next: objl22 };


var objRet = addTwoNumbers(objl11, objl21);

console.log(` the object result of two number added is :${JSON.stringify(objRet)}`);