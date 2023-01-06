/**
  实现Array.lastIndexOf的类型版本，LastIndexOf<T, U>接收一个数组T，任何U，并返回数组T中最后一个U的索引。

  例如：

  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1

 */
/* _____________ 你的代码 _____________ */

type LastIndexOf<T, U> = T extends [...infer Rest, infer Last] ? Equal<Last, U> extends true ? Rest['length'] : LastIndexOf<Rest, U> : -1

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

/* _____________ 理解备注 _____________ */
// lastIndexOf是indetOf变种方法，,接收一个元素如果元素在数组内则返回最后一个存在的索引值,否
// 则返回-1，思路和 IndexOf 类似，从最后一个下标往前判断即可。注意点是正常情况下无法用常规办
// 法把 Index 下标减一，但好在 R 数组长度可以代替当前下标


