/**
实现一个FilterOut<T, F>类型，从元组T中过滤出给定类型F的项目。

示例：

type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]

 */
/* _____________ 你的代码 _____________ */


type FilterOut<T extends any[], F, R extends any[] = []> = T extends [infer First, ...infer Rest] ? FilterOut<Rest, F, [First] extends [F] ? R : [...R, First]> : R



/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]

/* _____________ 理解备注 _____________ */
// 和之前medium题类似，比较综合，递归数组,由infer来判定是否是过滤目标，特别要注意never类型，
// T extends never ? true : false，因为无法判断never上，never 在泛型中的特殊性，它不会触发
//  extends 判断，而是直接终结，致使判断无效。只要绕过这个特性就行，常见的就是包一个数组。
