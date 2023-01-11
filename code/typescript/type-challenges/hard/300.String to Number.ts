/**

将一个字符串字头转换为一个数字，其行为类似于Number.parseInt。

 */
/* _____________ 你的代码 _____________ */

type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]
/* _____________ 理解备注 _____________ */
// 作者出这个题目的时候估计还没有更新到TS4.7， 现在4.7 版本中 TypeScript 支持了 infer extends 语
// 法，使得我们可以直接一步就 infer 到预期类型的值，而不需要再次进行条件语句判断，4.8 版本在此基础
// 上进行了进一步地增强，当 infer 被约束为一个原始类型，那么它现在会尽可能将 infer 的类型信息推导
// 到字面量类型的级别