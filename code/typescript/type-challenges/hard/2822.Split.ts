/**

众所周知，split()方法通过寻找分隔符将一个字符串分割成一个子字符串数组，并返回新的数组。本挑战的目标
是通过使用分隔符来分割字符串，但要在类型系统中进行分割。

示例：

type result = Split<'Hi! How are you?', ' '>  // should be ['Hi!', 'How', 'are', 'you?']

 */
/* _____________ 你的代码 _____________ */


type Split<S extends string, SEP extends string> =
  S extends `${infer First}${SEP}${infer Rest}` ? [First, ...Split<Rest, SEP>] : SEP extends '' ? [] : string extends S ? S[] : [S]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]

/* _____________ 理解备注 _____________ */
// 利用字符串递归和infer 以及入参限制来完成这题，infer First + SEP + infer Rest匹配字符串
// 符合条件的元素，然后在根据case里分辨限制空值入参限制，并且不一定是字符串子类，case里还有
// string类型，直接用S[]:[S]来区分 