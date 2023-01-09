/**
  通过实现一个 GetMiddleElement 方法，获取数组的中间元素，用数组表示

  如果数组的长度为奇数，则返回中间一个元素 如果数组的长度为偶数，则返回中间两个元素

  type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // 返回 [3]
  type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // 返回 [3, 4]

 */
/* _____________ 你的代码 _____________ */

type GetMiddleElement<T extends any[]> = T['length'] extends 0 | 1 | 2
  ? T
  : T extends [infer L, ...infer Mid, infer R]
  ? GetMiddleElement<Mid>
  : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>

/* _____________ 理解备注 _____________ */
// 这题最开始的时候列了好多，后来看了别人的巧思，首先对于输出结果T的length只会存在
// 长度为0,1,2。这点很重要，也是最开始没想到的。从结果开始推倒，如果结果T长度不是012，
// 就利用infer掐头去尾，对中间数据再次递归，直至终史。



