/**
  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

  例如:

  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
 */
/* _____________ 你的代码 _____________ */

type NumberLength<T extends number> =
  `${T}` extends `${number}${number}${number}${number}`
  ? 4
  : `${T}` extends `${number}${number}${number}`
  ? 3
  : `${T}` extends `${number}${number}`
  ? 2
  : `${T}` extends `${number}`
  ? 1
  : never

type MinusOne<T extends number, K extends number[] = []> = [...K, 1]['length'] extends T
  ? K['length']
  : NumberLength<T> extends NumberLength<K['length']>
  ? MinusOne<T, [...K, 1]>
  : MinusOne<T, [...K, 1, 1, 1, 1, 1, 1, 1, 1, 1]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ 理解备注 _____________ */
// 查询了下TS没有像JS一样普通的的运算能力，但涉及数字却有一条生路，即TS可通过 ['length'] 访问数组长度，几
// 乎所有数字计算都是通过它推导出来的，这题的开始的时候以为很简单思路是构造一个长度为泛型长度 -1 的数组，获
// 取其 ['length'] 属性，但该方案有多个个硬伤，首先无法计算负值，因为数组长度不可能小于 0，其次没有通
// 过 MinusOne<1101> 测试，因为递归 1000 次就是上限了。看了下参考答案，大神的思路：
// 
