/**
  实现 TrimLeft<T> ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

  例如

  type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
 */
/* _____________ 你的代码 _____________ */

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


/* _____________ 理解备注 _____________ */
// 据了解TS暂时不支持正则表达式检查类型合规性，这种问题用不了正则只能递归了,这题大体思路为即如果字符串前面包含空格，就把
// 空格去了继续递归，否则返回字符串本身。infer也能用在字符串内进行推导。但是case还有\n \t这种的，只能强行加入判断
