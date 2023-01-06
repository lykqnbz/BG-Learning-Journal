/**
  实现 TrimRight<T> ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

  例如

  type Trimed = TrimRight<'  Hello World  '> // 应推导出 '  Hello World'

 */
/* _____________ 你的代码 _____________ */

type isEmpty = ' ' | '\t' | '\n'
type TrimRight<S extends string> = S extends `${infer R}${isEmpty}`
  ? TrimRight<R>
  : S


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]


/* _____________ 理解备注 _____________ */
// 题目越来越难，这题在难题中显得意外显眼(恢复自信题？)，思路是用 infer 找出空格前的字符串递归一下即可
// 再补上测试用例的边界情况\n 与 \t的入参限制