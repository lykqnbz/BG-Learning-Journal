/**
  实现一个IsTuple类型，它接受一个输入类型T并返回T是否是元组类型。

  例如：

  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false

 */
/* _____________ 你的代码 _____________ */

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T['length']
  ? false
  : true
  : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]


/* _____________ 理解备注 _____________ */
// Tuple 与 Array 在 TS 里的区别是前者长度有限，后者长度无限，从结果来看，如果访问
// 其 ['length'] 属性，前者一定是一个固定数字，而后者返回 number，用这个特性判断即可
// 这个还是根据case里测试出来的IsTuple<{ length: 1 }> 单测用例，它可以通过 number extends T['length']
// 的校验，但因为其本身不是数组类型，所以无法通过 T extends readonly any[] 的前置判断
// 然后入参时要考虑下never的可能性，用[never]跳过never不做判断的特性

