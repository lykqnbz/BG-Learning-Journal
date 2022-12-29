/**
  实现 Capitalize<T> 它将字符串的第一个字母转换为大写，其余字母保持原样。

  例如

  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
 */
/* _____________ 你的代码 _____________ */

// #1
type MyCapitalize<S extends string> = Capitalize<S>
// #2
// type MyCapitalize<S extends string> = S extends `${infer K}${infer T}` ? `${Uppercase<K>}${T}` : S


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<'foo bar AA'>, 'Foo bar AA'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]


/* _____________ 理解备注 _____________ */
// 如果这是一道 JS 题那就简单，可题目是TS的。首先我们要知道TS的一些基础函数：
// Uppercase(转换字符串字面量到大写字母)
// Lowercase(转换字符串字面量到小写字母)
// Capitalize(转换字符串字面量的第一个字母为大写字母)
// Uncapitalize(转换字符串字面量的第一个字母为小写字母)
// 第一种是直接使用现成的内置函数Capitalize实现，第二种是大神的答案，我表示不太理解，为什么两个infer就能匹配到首字母,三个或者一个就不行？

