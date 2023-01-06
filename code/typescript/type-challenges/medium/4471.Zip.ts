/**
  在这个挑战中，你应该实现一个Zip<T, U>类型，T和U必须是元组。

  例如：

  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]

 */
/* _____________ 你的代码 _____________ */


type Zip<
  T extends any[],
  U extends any[],
  I extends number[] = [],
  R extends any[] = []> =
  I['length'] extends T['length']
  ? R
  : U[I['length']] extends undefined
  ? Zip<T, U, [...I, 0], R>
  : Zip<T, U, [...I, 0], [...R, [T[I['length']], U[I['length']]]]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

/* _____________ 理解备注 _____________ */
// 查了下zip() 函数，是用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个
// 元组，然后返回由这些元组组成的列表。如果各个迭代器的元素个数不一致，则返回列表
// 长度与最短的对象相同.
// 本来的思路是配合辅助变量，进行计数递归，并额外用一个类型变量存储结果。但是不符合
// case里Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>的要求，学习了下参考答案的思路
// [...R, [T[I['length']], U[I['length']]]] 在每次递归时按照 Zip 规则添加一条结
// 果，其中 I['length'] 起到的作用类似 for 循环的下标 i。

