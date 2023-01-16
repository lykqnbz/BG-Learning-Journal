/**
  实现Math.trunc的类型版本，它接收字符串或数字，并通过删除任何小数位返回数字的整数部分。

  例如：

  type A = Trunc<12.34> // 12


 */
/* _____________ 你的代码 _____________ */


type Trunc<T extends number | string> = `${T}` extends `${infer A}.${infer B}` ? `${A}` : `${T}`

/* _____________ 测试用例 _____________ */

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]

/* _____________ 理解备注 _____________ */
// 这题也感觉是信心恢复题，入参是字符串就很简单了，直接infer加小数点来判断字符串组成就好了
// 如果是数字就用模板字符转换一下.
