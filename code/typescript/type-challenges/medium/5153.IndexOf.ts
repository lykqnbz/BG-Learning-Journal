/**
  实现Array.indexOf的类型版本，indexOf<T, U>接收一个数组T，任何U，并返回数组T中第一个U的索引。

  例如：

  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1

 */
/* _____________ 你的代码 _____________ */

type IndexOf<T, U, R extends any[] = []> = T extends [infer First, ...infer Rest] ? Equal<First, U> extends true ? R['length'] : IndexOf<Rest, U, [...R, 1]> : -1

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]

/* _____________ 理解备注 _____________ */
// indexOf在JS中算是常用方法,接收一个元素如果元素在数组内则返回第一个存在的索引值,否
// 则返回-1,思路是需要用一个辅助变量存储命中下标，递归的方式一个个判断是否匹配，但是遇
// case中到了IndexOf<[string, 1, number, 'a'], number>和IndexOf<[any, 1], 1>, 1>，
// 因为1 extends number，1 extends any结果为真，查了下资料说要换成 Equal 函数判断相等

