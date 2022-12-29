/**
  实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。

  例如

  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
 */
/* _____________ 你的代码 _____________ */

type Last<T extends any[]> = T extends [...infer T, infer P] ? P : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ 理解备注 _____________ */
// 之前实现过first，type First<T extends any[]> = T extends [] ? never : T[0] 进行改造一下,在解构时把最后一个描述成 infer，
// 之前的参数描述成...infer
