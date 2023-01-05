/**
  实现类型版本的数组反转 Array.reverse

  例如：

  type a = Reverse<['a', 'b']> // ['b', 'a']
  type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
 */
/* _____________ 你的代码 _____________ */

type Reverse<T extends any[]> = T extends [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>] : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]
/* _____________ 理解备注 _____________ */
// 思路是数组内...infer Rest,infer Last 来获取最后一个元素，然后无限递归就好，最后限制下入参要求

