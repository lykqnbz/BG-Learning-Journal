/**
  实现一个通用Pop<T>，它接受一个数组T，并返回一个由数组T的前length-1项以相同的顺序组成的数组。

  例如

  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
 */
/* _____________ 你的代码 _____________ */

type Pop<T extends any[]> = T extends [] ? [] : T extends [...infer P, infer K] ? P : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]

/* _____________ 理解备注 _____________ */
// 这道题和 15.Last of Array 几乎完全一样，返回第一个解构值...infer 就行了，多判断一层空数组来约束空值传入。
