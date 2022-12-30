/**
  实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。

  例如

  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
 */
/* _____________ 你的代码 _____________ */

type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer T}${From}${infer K}` ? `${T}${To}${K}` : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]


/* _____________ 理解备注 _____________ */
// 和Trim同理，把From夹在字符串中间，前后用两个infer推导，最后输出时前后不变，把From换成To就行了
// 需要特殊处理的就是From是空字符串的情况

