/*
21. 合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

示例 1：


输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
示例 2：

输入：l1 = [], l2 = []
输出：[]
示例 3：

输入：l1 = [], l2 = [0]
输出：[0]
 

提示：

两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    //增加一个空的头节点
    var head = new ListNode(null, list1);
    var ret = head;
    //循环链表
    while (list1 != null || list2 != null) {
        if (list1 == null) {
            head.next = list2;
            return ret.next;
        }

        if (list2 == null) {
            head.next = list1;
            return ret.next;
        }

        //比较两个值
        if (list1.val <= list2.val) {
            //取最小的
            head.next = list1;
            list1 = list1.next;
        } else {
            head.next = list2;
            list2 = list2.next;
        }

        //头指针往后挪一位
        head = head.next;
    }
    return ret.next;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}