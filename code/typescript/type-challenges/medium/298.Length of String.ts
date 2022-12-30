/**
  计算字符串的长度，类似于 String#length 。
 */
/* _____________ 你的代码 _____________ */

type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer K}${infer M}` ? LengthOfString<M, [...T, K]> : T['length']


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ 理解备注 _____________ */
// 如果是JS的话会很简单直接使用内置函数或者转为数组取length即可，TS的话也是一样访问数组类型的[length]属性可以拿到长度值。
// 只需要把入参字符串转换成数组即可，然后使用我们自定义的第二个入参泛型来用于存储结果
// 思路就是，每次把字符串第一个字母拿出来放到数组T的第一项，直到字符串被取完，直接拿此时的数组长度
