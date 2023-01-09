/**
  实现类型Filter<T, Predicate>需要一个数组T，原始类型或联合原始类型Predicate，并返回一个包括Predicate元素的数组。

 */
/* _____________ 你的代码 _____________ */

type Filter<T extends any[], P, R extends any[] = []> = T extends [infer First, ...infer Rest] ? First extends P ? Filter<Rest, P, [...R, First]> : Filter<Rest, P, R> : R

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]

/* _____________ 理解备注 _____________ */
// medium的最后一题还是比较简单的，和之前最的题目大同小异，利用infer在数组内逐个递归
// 对比联合类型P，最后存储在辅助变量R里，输出结果即可。



