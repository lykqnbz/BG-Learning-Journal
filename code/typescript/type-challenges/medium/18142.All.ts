/**
  如果列表中的所有元素都等于传入的第二个参数，则返回真，如果有任何不匹配则返回假。

  例如：

  type Test1 = [1, 1, 1]
  type Test2 = [1, 1, 2]

  type Todo = All<Test1, 1> // should be same as true
  type Todo2 = All<Test2, 1> // should be same as false

 */
/* _____________ 你的代码 _____________ */

type All<T extends any[], K> = T extends [infer First, ...infer Rest] ? Equal<First, K> extends true ? All<Rest, K> : false : true


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
]

/* _____________ 理解备注 _____________ */
// 这个思路就是逐个递归对比T里的元素是否和K相等，利用infer在数组内的特性，特别要的注意的是因
// 为case里有number类型,null之类的父级类型，不能直接使用extends 来判断是否相等，要使用
// Equal来判定相等



