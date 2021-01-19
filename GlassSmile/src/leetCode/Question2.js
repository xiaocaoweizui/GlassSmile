
/*
  去除重复字母
  给你一个字符串s,请你去除字符串中重复的字母，使字母只出现一次，需要保证返回结果的字典序最小
  （要求不打乱其他字符的相对位置）

  示例 ：输入s="bcabc"  输出“abc”
  输入：“cbacdcbc”,输出 “acbd”

*/
var TrimAndSortStr = function (str) {
    var len = str.length;
    var chars = [];
    for (var i = 0; i < len; i++) {
        var strChar = str.substr(i,1);
     
        PushArr(chars, strChar)
    }
    return chars.join("");

}

var PushArr = function (arr, item) {
    if (arr.length == 0) {
        arr.push(item);
    } else {
        var pos = arr.length - 1;
        while (arr[pos] > item && pos >= 0) {
            pos--;
        }
        if (arr[pos] == item) {
            return;
        }

        //pos 的位置插入item，后面的往后移一位
        arr.push("");
        for (var i = arr.length - 1; i > pos; i--) {
            arr[i] = arr[i - 1];
        }
        arr[pos + 1] = item;
    }

}

var tmp=TrimAndSortStr("bcabc");
console.log(tmp);

var tmp2=TrimAndSortStr("cbacdcbc");
console.log(tmp2);