/*
23. 合并K个升序链表

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。


示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
 

提示：

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    if (lists.length == 0) {
        return (new ListNode(null, null)).next;
    }
    //增加一个空的头节点
    var head = new ListNode(null, lists[0]);
    var ret = head;

    //循环list对象中的链表的第一个值
    let val = 100000;
    let node = new ListNode(null, null);
    let nullNum = 0;
    var pos = -1;
    while (nullNum != lists.length) {
        nullNum = 0;
        pos = -1;
        val = 100000;
        for (let i = 0; i < lists.length; i++) {
            if (lists[i] == null) {
                nullNum++;
            }
            //如果链表节点不为空，且值最小
            else if (lists[i] != null && lists[i].val <= val) {
                val = lists[i].val;
                node = lists[i];
                pos = i;
            }
        }
        //找到了
        if (pos > -1) {
            //找到了最小的节点,将链表往后移动
            head.next = node;
            lists[pos] = node.next;

            //往后移动一位
            head = head.next;
            //当list对象中所有链表都为null，截止
            if (lists[pos] == null) {
                nullNum++;
            }
        }
    }

    return ret.next;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}