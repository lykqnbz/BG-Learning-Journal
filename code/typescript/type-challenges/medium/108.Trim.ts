/**
  实现Trim<T>，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

  例如

  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
 */
/* _____________ 你的代码 _____________ */

// #1
// type Trim<S extends string> = TrimLeft<TrimRight<S>>
// type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S
// type TrimRight<S extends string> = S extends `${infer R}${' ' | '\n' | '\t'}` ? TrimRight<R> : S
// #2
// type Trim<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? Trim<R> : S extends `${infer R}${' ' | '\n' | '\t'}` ? Trim<R> : S
// #3
type Trim<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` | `${infer R}${' ' | '\n' | '\t'}` ? Trim<R> : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

/* _____________ 理解备注 _____________ */
// 这个问题简单的解法是，左右都 Trim 一下，这种实现成本很低，性能也不差，因为单写TrimLeft与TrimRight都很简单
// 额外写了一种一次性完成的思路是利用TS联合类型extends后面还可以跟联合类型，这样任意一个匹配都会走到Trim<R>递归里
