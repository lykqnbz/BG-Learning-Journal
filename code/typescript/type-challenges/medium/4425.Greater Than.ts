/**
 实现一个GreaterThan<T, U>类型，如`T>U`

  负数不需要考虑。

  例如：

  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true

 */
/* _____________ 你的代码 _____________ */

// #1
type GreaterThan<T extends number, U extends number, R extends number[] = []>
  = T extends R['length'] ? false : U extends R['length'] ?
  true : GreaterThan<T, U, [...R, 1]>
// #2
// type ArrGreaterThan<T extends 1[], U extends 1[]> = U extends [...T, ...any]
//   ? false
//   : true
// type GreaterThan<T extends number, U extends number> = ArrGreaterThan<T[], U[]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]

/* _____________ 理解备注 _____________ */
//  因为TS不支持加减法与大小判断，这道题思路是是递归，但会受限于入参数量限制，可能堆栈溢出(本地操作巨卡)，
// 递归要有一个递增 Key，拿 T U 先后进行对比，谁先追上这个数，谁就是较小的那个。
// 有看到参考答案大佬的写法，用巧妙的方式构造出长度符合预期的数组，用数组 ['length'] 进行比较：
// 做法是快速构造两个长度分别等于 T U 的数组，用数组快速判断谁更长。快速判断 [1, 1] 与 [1, 1, 1] 谁更大。
// 因为 TS 没有大小判断能力，所以拿到了 ['length'] 也没有用，得考虑 arr1 extends arr2 这种方式。可
// 惜的是，长度不相等的数组，extends 永远等于 false:
// [1,1,1,1] extends [1,1,1] ? true : false // false
// [1,1,1] extends [1,1,1,1] ? true : false // false
// [1,1,1] extends [1,1,1] ? true : false // true
// 期望进行如下判断：
// ArrGreaterThan<[1,1,1,1],[1,1,1]> // true
// ArrGreaterThan<[1,1,1],[1,1,1,1]> // false
// ArrGreaterThan<[1,1,1],[1,1,1]> // false
// 既然俩数组相等才返回 true，那用 [...T, ...any] 进行补充判定，如果能判定为 true，就说明前者长度更短（因为后者补充几项后可以判等）
