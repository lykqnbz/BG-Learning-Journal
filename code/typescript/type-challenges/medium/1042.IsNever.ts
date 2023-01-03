/**
  实现 IsNever 判断值类型是否为 never

  示例:

  type A = IsNever<never>  // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
 */
/* _____________ 你的代码 _____________ */

type IsNever<T> = [T] extends [never] ? true : false


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]


/* _____________ 理解备注 _____________ */
// 首先可以毫不犹豫的写下一个错误答案T extends never ? true : false，因为无法判断never上，never 在泛型中的特殊性，它不
// 会触发 extends 判断，而是直接终结，致使判断无效。只要绕过这个特性就行，常见的就是包一个数组
