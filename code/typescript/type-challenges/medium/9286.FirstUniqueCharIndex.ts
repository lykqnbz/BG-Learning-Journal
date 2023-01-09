/**
  给定一个字符串s，找到其中第一个不重复的字符并返回其索引。如果它不存在，返回-1。

 */
/* _____________ 你的代码 _____________ */


type getRecordList<T extends string, M extends Record<PropertyKey, unknown[]> = {}> = T extends `${infer F}${infer L}`
  ? F extends keyof M
  ? getRecordList<L, { [P in F]: [...M[F], unknown] } & Omit<M, F>>
  : getRecordList<L, { [P in F]: [unknown] } & M>
  : M

type FirstUniqueCharIndex<T extends string, I extends unknown[] = [], M extends Record<PropertyKey, unknown[]> = getRecordList<T>> = T extends `${infer F}${infer L}`
  ? M[F]['length'] extends 1 ? I['length']
  : FirstUniqueCharIndex<L, [...I, unknown], M>
  : -1

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]

/* _____________ 理解备注 _____________ */
// 这题利用字符串逐个递归，有点耗性能。在递归之前先把每个字符串出现的次数先保存起来
// 然后在递归的时候查询getRecordList返回字符串对应当前字符串第一个出现的次数为1的
// 字符串，如果没有就返回-1



