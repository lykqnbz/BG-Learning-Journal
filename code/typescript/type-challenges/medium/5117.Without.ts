/**
  实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

  例如：

  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []

 */
/* _____________ 你的代码 _____________ */

type ArrayToUnion<T> = T extends any[] ? T[number] : T
type Without<T, U> =
  T extends [infer First, ...infer Rest] ? First extends ArrayToUnion<U> ? Without<Rest, U> : [First, ...Without<Rest, U>] : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

/* _____________ 理解备注 _____________ */
// 参数 U 可能是字符串或字符串数组，要判断是否存在只能用 extends，所以要对U进行一层过滤
// ArrayToUnion让U转变成联合类型，打平数组方便 extends判断。然后每次取数组第一项，判断
// 是否被 U 包含，是的话就剔除，否则包含（包含的动作是形成新的数组 [First, ...] 并把递
// 归内容解构塞到后面）。

