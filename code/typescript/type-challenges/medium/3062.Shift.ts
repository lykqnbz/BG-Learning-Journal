/**
  实现Array.shift的类型版本

  例如：

  type Result = Shift<[3, 2, 1]> // [2, 1]
 */
/* _____________ 你的代码 _____________ */

type Shift<T extends any[]> = T extends [] ? [] : T extends [infer K, ...infer S] ? S : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]

/* _____________ 理解备注 _____________ */
// Array.shift作用于数组剔除数字第一个元素并返回一个新数组。很简单这题只要把第一项抛弃即可，利用 infer K和...infer S实现
// 入参过滤一下case的unknown和空数组[]

