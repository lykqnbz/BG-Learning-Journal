/**
  实现一个将接收到的String参数转换为一个字母Union的类型。

  例如

  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
 */
/* _____________ 你的代码 _____________ */

// #1
// type StringToUnion<T extends string, P = never> = T extends `${infer K}${infer S}` ? StringToUnion<S, P | K> : P
// #2
type StringToUnion<T> = T extends `${infer K}${infer S}` ? K | StringToUnion<S> : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

/* _____________ 理解备注 _____________ */
//  这题还是老套路，用一个新的泛型存储答案或者直接使用|联合成存储答案，利用infer递归字符串最后使用|来存储Union类型

