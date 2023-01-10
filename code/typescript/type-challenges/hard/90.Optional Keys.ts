/**
  实现高级 util 类型OptionalKeys<T>，该类型将 T 中所有可选属性的键合并为一个联合类型。

 */
/* _____________ 你的代码 _____________ */

type Required<T> = { [K in keyof T]-?: T[K] }
type GetOptional<T> = { [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K] }
type OptionalKeys<T> = keyof GetOptional<T>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]
/* _____________ 理解备注 _____________ */
// 这题和57.Get Required，59.Get Optional以及89.Required Keys都同一个类型的题目，中心思想可
// 看57.Get Required。直接把59.Get Optional的过程拷贝过来，然后使用keyof 提取key就好