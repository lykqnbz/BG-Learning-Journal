/**
  给定一个唯一元素的数组，返回所有可能的子序列。

  子序列是指通过删除部分或全部元素而不改变剩余元素的顺序，可以从一个数组中得到的序列。

  例如：

  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]

 */
/* _____________ 你的代码 _____________ */

type Subsequence<T extends number[]> = T extends [infer F, ...infer R extends number[]] ? (
  Subsequence<R> | [F, ...Subsequence<R>]
) : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>,
]

/* _____________ 理解备注 _____________ */
// 同样是和上题类似的数组全排列返回，只要每次取第一项，与剩余项的递归构造出结果，| 上剩余项本身递归
// 的结果就可以了。



