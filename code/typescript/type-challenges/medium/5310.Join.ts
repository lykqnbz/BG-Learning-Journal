/**
  实现Array.join的类型版本，Join<T, U>接收一个数组T，字符串或数字U，并返回与U缝合的数组T。

  例如：

  type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
  type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
  type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
  type Res3 = Join<["o"], "u">; // expected to be 'o'

 */
/* _____________ 你的代码 _____________ */

type Join<T, U extends string | number, R extends string = ''> = T extends [infer First extends string, ...infer Last] ? R extends '' ? Join<Last, U, `${First}`> : Join<Last, U, `${R}${U}${First}`> : R

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]

/* _____________ 理解备注 _____________ */
// join在JS中也是常用方法,在原有数组基础上，将分隔符加入在每个项中返回一个字符串
// 思路是递归 T 每次拿第一个元素，再使用一个辅助字符串存储答案，拼接起来即可，唯一
// 要注意的是处理到第一项时，不要追加 U ，可以通过 R extends '' 来判断

