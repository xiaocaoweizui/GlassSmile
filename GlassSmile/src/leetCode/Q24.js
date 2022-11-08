/*
19. 删除链表的倒数第 N 个结点
中等
2.3K
相关企业
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

 

示例 1：


输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
示例 2：

输入：head = [1], n = 1
输出：[]
示例 3：

输入：head = [1,2], n = 1
输出：[1]
 

提示：

链表中结点的数目为 sz
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 

进阶：你能尝试使用一趟扫描实现吗？
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    //采用快慢指针的方式处理这个问题
    //两个指针，slow=fast+n；

    //倒数n个，数组位len，倒数n，则要删除的位置是len-n-1；
    //按数组下标要默认多减一位，则加入一个前置null的对象
    const prev = new ListNode(null, head);
    let slow = fast = prev;
    //移动块指针n位置
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }
    //当快指针到达尾部的时候，移除慢指针后面一个位置
    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return prev.next;
   
};
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var Node = new ListNode('', null);
console.log(`the node is ${Node.val}`);