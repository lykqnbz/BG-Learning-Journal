/**
  实现泛型TupleToUnion<T>，它返回元组所有值的合集。

  例如

  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
 */
/* _____________ 你的代码 _____________ */

type TupleToUnion<T extends any[]> = T[number]


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

/* _____________ 理解备注 _____________ */
// 这题将元组类型转换为其所有值的展开集合，也就是我们希望用所有下标访问这个数组，在TS里用[number]作为下标即可
// 这边的T是一个any类型的数据, 所以这边的T[number]是代表取数组的中值作为key,number是数组下标。
