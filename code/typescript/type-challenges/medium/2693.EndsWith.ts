/**
  实现EndsWith<T, U>,接收两个string类型参数,然后判断T是否以U结尾,根据结果返回true或false

  例如:

  type a = EndsWith<'abc', 'bc'> // expected to be true
  type b = EndsWith<'abc', 'abc'> // expected to be true
  type c = EndsWith<'abc', 'd'> // expected to be false
 */
/* _____________ 你的代码 _____________ */

type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
]

/* _____________ 理解备注 _____________ */
// 有了上一题的大神经验直接使用用 ${string} 或者${infer X}匹配任意字符串进行 extends 判定

