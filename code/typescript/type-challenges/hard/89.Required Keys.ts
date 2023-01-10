/**
  实现高级 util 类型RequiredKeys<T>，该类型返回 由 T 中所有必需属性的键组成的一个联合类型。

  例如

  type Result = RequiredKeys<{ foo: number; bar?: string }>
  // expected to be “foo”

 */
/* _____________ 你的代码 _____________ */

type Required<T> = { [K in keyof T]-?: T[K] }
type GetRequired<T> = { [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] }
type RequiredKeys<T> = keyof GetRequired<T>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]

/* _____________ 理解备注 _____________ */
// 这题和57.Get Required，59.Get Optional以及90.Optional Keys都同一个类型的题目，中心思想可
// 看57.Get Required。直接把57.Get Required的过程拷贝过来，然后使用keyof 提取key就好