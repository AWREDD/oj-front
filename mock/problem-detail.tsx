
const content = {
    "content": "给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。你可以假设除了数字0之外，这两个数都不会以0开头。",
    "example": [
      {
        "input": "l1=[2,4,3],l2=[5,6,4]",
        "output": "l3=[7,0,8]"
      },
      {
        "input": "l1=[0],l2=[0]",
        "output": "l3=[0]"
      }
    ],
    "notice": [
      "每个链表中的节点数在范围[1,100]内",
      "0<=Node.val<=9",
      "题目数据保证列表表示的数字不含前导零"
    ],
    "solution": {
      "description": "由于输入的两个链表都是逆序存储数字的位数的，因此两个链表中同一位置的数字可以直接相加。我们同时遍历两个链表，逐位计算它们的和，并与当前位置的进位值相加。具体而言，如果当前两个链表处相应位置的数字为n1,n2n1,n2n1,n2，进位值为carrycarrycarry，则它们的和为n1+n2+carryn1+n2+carry；其中，答案链表处相应位置的数字为(n1+n2+carry) mod 10(n1+n2+carry) \bmod 10(n1+n2+carry)mod10，而新的进位值为⌊n1+n2+carry10⌋lfloor\frac{n1+n2+carry}{10}\rfloor⌊10n1+n2+carry⌋。如果两个链表的长度不同，则可以认为长度短的链表的后面有若干个000。此外，如果链表遍历结束后，有carry>0\textit{carry} > 0carry>0，还需要在答案链表的后面附加一个节点，节点的值为carry\textit{carry}carry。",
      "code": "test"
    }
};

const tag = [{ "content": "easy", "color": "green" },{ "content": "2021", "color": "orange" },{ "content": "noip", "color": "red" }];
export default {
    "GET problem": {
        "id": 1,
        "title": "两数相加",
        "contributor": "张三",
        "start_time": "2020-01-01 00:00:00",
        "time_limit": 1000,
        "content": content,
        "status": "AC"
    }
}
