/**
  给定一个字符串数组，进行排列组合。它对于像视频控件List这样的道具类型也很有用。

  例如：

  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>

 */
/* _____________ 你的代码 _____________ */

type AllCombinations<T extends string[], U extends string = T[number]> = [
  U
] extends [never]
  ? ''
  : '' | { [K in U]: `${K} ${AllCombinations<never, Exclude<U, K>>}` }[U]

type TrimRight<T extends string> = T extends `${infer R} ` ? TrimRight<R> : T

type Combination<T extends string[]> = TrimRight<Exclude<AllCombinations<T>, ''>>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
    'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


/* _____________ 理解备注 _____________ */
// 这题和4260.AllCombinations类似，AllCombinations需要把字符串转换成全排序的联合类型，这题相比于更加
// 简单，数组转换为联合类型只需要T[number]。所以可以把AllCombinations 稍微改造下，再利用 Exclude 和
// TrimRight 删除多余的空格。  


