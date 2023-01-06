/**
  你知道lodash吗？Chunk是它的一个非常有用的函数，现在让我们来实现它。
  Chunk<T, N>接受两个必要的类型参数，T必须是一个元组，而N必须是一个>=1的整数。

  例如：

  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]

 */
/* _____________ 你的代码 _____________ */

type Chunk<T extends any[], N extends number = 1, Chunked extends any[] = []>
  = T extends [infer Head, ...infer Tail]
  ? Chunked['length'] extends N
  ? [Chunked, ...Chunk<T, N>]
  : Chunk<Tail, N, [...Chunked, Head]>
  : Chunked extends []
  ? Chunked
  : [Chunked]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ 理解备注 _____________ */
// 首先要知道lodash.chunk()函数作用是把一个数组分割为新的数组块，T表示规定要使用的数组/元祖
// T表示一个大于0整数，规定每个新数组块包含多少个元素，返回一个多维的数值数组，从 0 开始，每
// 个维度都包含 size 元素。说实话思路还是递归，但是试了半小时还是没有啥头绪，只能看参考答案来
// 解析：递归需要一个变量记录当前收集到 Chunk 里的内容，在 Chunk 达到上限时释放出来，同时也
// 要注意未达到上限就结束时也要释放出来：
// type Chunk<T extends any[], N extends number = 1, Chunked extends any[] = []> =
//   T extends [infer First, ...infer Last]
//   ? Chunked['length'] extends N
//   ? [Chunked, ...Chunk<T, N>]
//   : Chunk<Last, N, [...Chunked, First]>
//   : [Chunked]
// Chunked['length'] extends N 判断 Chunked 数组长度达到 N 后就释放出来，否则把当前数组第一
// 项First 继续塞到 Chunked 数组，数组项从 Last 开始继续递归。但是 Chunk<[], 1> 这个单测没过，
// 因为当 Chunked 没有项目时，就无需成组了

