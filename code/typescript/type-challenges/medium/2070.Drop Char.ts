/**
  从字符串中剔除指定字符。

  例如：

  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
 */
/* _____________ 你的代码 _____________ */

type DropChar<S, C extends string> = S extends `${infer T}${C}${infer K}` ? `${T}${DropChar<K, C>}` : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]


/* _____________ 理解备注 _____________ */
// 这道题和 Replace 很像，把C夹在字符串中间，前后用两个infer推导，最后输出时前后不变，只要用递归不断把 C 排除掉即可
