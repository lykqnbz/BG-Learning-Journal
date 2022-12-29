/**
  实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。

  例如：

  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3

*/

/* _____________ 你的代码 _____________ */

// type First<T extends any[]> = T[0]
// 普通写法
// type First<T extends any[]> = T extends [] ? never : T[0]
// infer写法
type First<T extends any[]> = T extends [infer P, ...infer K] ? P : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


/* _____________ 理解备注 _____________ */
// JS 版本
// function getFirst(arr) {
//   if (arr.length === 0) return 'never'
//   return arr[0]
// }
// 最开始感觉答案太简单，以至于不敢写下去，写了触发了never产生的边界判断问题，有空数组的情况要考虑，空数组时返回类型 never 而不是 undefined 会更好
