/**

实现Format<T extends string> generic。

示例：

type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string

 */
/* _____________ 你的代码 _____________ */

type Format<T extends string> =
  T extends `${string}%${infer First}${infer Rest}`
  ? First extends 's'
  ? (s1: string) => Format<Rest>
  : First extends 'd'
  ? (s1: number) => Format<Rest>
  : Format<Rest>
  : string

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

/* _____________ 理解备注 _____________ */
// 。。完全没看懂题目要表达的意思。。 参考答案也写的莫名其妙，我的理解是字符串里有
// %s则输出(s1: string) =>，有%d则输出(d1: number)，按顺序输出最后结string。。。
// 强行为了过case而做题目。。直接infer字符串递归检测d和s了。