/**
  构造一个给定长度的元组。

  例如

  type result = ConstructTuple<2> // 期望得到 [unknown, unkonwn]

 */
/* _____________ 你的代码 _____________ */

type ConstructTuple<L extends number, R extends any[] = []> = L extends R['length'] ? R : ConstructTuple<L, [...R, unknown]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]

/* _____________ 理解备注 _____________ */
// 思路还是递归加辅助变量，利用数组'length'获取长度并且一直递归自身往起始数组内加题目所需的unkonwn
// 但是最好要考虑一下过深递归导致性能下降的问题，我这个解法没有包含这个功能，之前2257.MinusOne里面
// 有涉及到



