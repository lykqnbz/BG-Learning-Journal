/**
  实现一个通用的Fibonacci<T>，接收一个数字T，并返回它对应的Fibonacci数字。

  序列开始：1，1，2，3，5，8，13，21，34，55，89，144， ... 

  例如：

  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21

 */
/* _____________ 你的代码 _____________ */

type Fibonacci<
  T extends number,
  N extends number[] = [1],
  Prev extends number[] = [1],
  Cur extends number[] = [1]
> = N['length'] extends T
  ? Prev['length']
  : Fibonacci<T, [...N, 1], Cur, [...Prev, ...Cur]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ 理解备注 _____________ */
// 首先要知道斐波那契数列是这个数列从第3项开始，每一项都等于前两项之和。思路是正常递归实现，用数组长度模拟计算。
// 需要一个额外变量标记递归了多少次，递归到第 N 次结束：
// type Fibonacci<T extends number, N = [1]> = N['length'] extends T ? (
//   // todo
// ) : Fibonacci<T, [...N, 1]>
// 每次执行都判断是否递归完成，否则继续递归并把计数器加一。还需要一个数组存储答案，一个数组存储上一个数。递归时
// 拿 Cur 代替下次的 Prev，用 [...Prev, ...Cur] 代替下次的 Cur，下次的 Cur 符合斐波那契定义。
