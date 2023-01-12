/**

实现一个通用的IsRequiredKey<T, K>，返回K是否是T的必要键

示例：
type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
type publicKyes = ClassPublicKeys<A> // 'str' | 'getNum'

 */
/* _____________ 你的代码 _____________ */

type IsRequiredKey<T, K extends keyof T, R = Pick<T, K>> = R extends Required<R> ? true : false;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]

/* _____________ 理解备注 _____________ */
// 这题用十分巧妙的想法，用辅助函数R储存从T里筛选出K key的数据，然后在直接使用
// Required进一步去筛选是否符合必选数据。