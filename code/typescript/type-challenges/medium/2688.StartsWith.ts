/**
  实现StartsWith<T, U>,接收两个string类型参数,然后判断T是否以U开头,根据结果返回true或false

  例如:

  type a = StartsWith<'abc', 'ac'> // expected to be false
  type b = StartsWith<'abc', 'ab'> // expected to be true
  type c = StartsWith<'abc', 'abcd'> // expected to be false
 */
/* _____________ 你的代码 _____________ */

// #1
// type StartsWith<T extends string, U extends string> =
//   U extends `${infer US}${infer UE}` ?
//   T extends `${infer TS}${infer TE}` ?
//   TS extends US ?
//   StartsWith<TE, UE>
//   : false
//   : false
//   : true

// #2
type StartsWith<T extends string, U extends string> = T extends `${U}${infer X}` ? true : false
// type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false
// type StartsWith<T extends string, U extends string> = T extends `${U}${number}` ? true : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]


/* _____________ 理解备注 _____________ */
// 思路是U如果为空字符串则匹配一切场景，直接返回 true；否则 U 可以拆为以 US(U Start) 开头、UE(U End) 的
// 字符串进行后续判定，接着如果 T 为空字符串则不可能被 U 匹配，直接返回 false；否则 T 可以拆为以 TS(T Start)
// 开头、TE(T End) 的字符串进行后续判定，最后如果 TS extends US 说明此次首字符匹配了，则递归匹配剩余字符
// StartsWith<TE, UE>，如果首字符不匹配提前返回 false
// 看了推荐答案有更加简单的写法，大神思路是#2用 ${string} 匹配任意字符串进行 extends 判定，有点正则的意思。
// 当然 ${string} 也可以被 ${infer X} 代替，只是拿到的 X 不需要再用到了，说明字符串模板最通用的指代
// 是 ${infer X} 或 ${string}，如果要匹配特定的数字类字符串也可以混用 ${number}。

