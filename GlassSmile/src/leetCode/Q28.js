/*
24. 两两交换链表中的节点

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

示例 1：


输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]
 

提示：

链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100
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
 * @return {ListNode}
 */
var swapPairs = function (head) {

    let pre = next = head;

    if (head == null || head.next == null) {
        return head;
    }
    let ret = head.next;
    while (head != null) {
        //取出两个节点
        pre = head;
        next = head.next;
        if (next != null) {
            //指针往后移动2位
            head = next.next;
            //交换两个节点
            next.next = pre;
            //后面存在2个节点
            if (head != null && head.next != null) {
                pre.next = head.next;
            } else {
                pre.next = head;
            }
        } else {
            head = null;
        }
    }
    return ret;

};


function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}



