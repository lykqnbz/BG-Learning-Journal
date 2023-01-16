/**
  请完成类型 Integer<T>，类型 T 继承于 number，如果 T 是一个整数则返回它，否则返回 never。

 */
/* _____________ 你的代码 _____________ */

type Integer<T extends number> = `${T}` extends `${infer F}.${infer L}`
  ? L extends 0
  ? F
  : never
  : number extends T ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]

/* _____________ 理解备注 _____________ */
// 利用字符串模板将T转换为字符串后利用infer判断是否带小数点，如果带小数点就判断小数点后面的是否
// 为零，否则就不符合题目要求要返回false



