/**
  实现Lodash.uniq的类型版本，Unique接收一个数组T，返回没有重复值的数组T。

  例如：

  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]

 */
/* _____________ 你的代码 _____________ */

type Includes<T, U> = T extends [infer F, ...infer Rest] ? Equal<F, U> extends true ? true : Includes<Rest, U> : false
type Unique<T, R extends any[] = []> = T extends [infer First, ...infer Rest] ? Includes<R, First> extends true ? Unique<Rest, R> : Unique<Rest, [...R, First]> : R

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

/* _____________ 理解备注 _____________ */
// Lodash.uniq的效果是创建一个去重后的array数组副本，简单的就是数组去重,去重需要不断递归产生去重后结果，因此思路
// 是需要一个辅助变量 R 配合，并把 T 用 infer 逐一拆解，判断第一个字符是否在结果数组里，如果不在就塞进.如何判断一
// 个对象是否出现在数组中，使用递归可以轻松完成,调用之前写过的Includes题目，每次取首项，如果等于 Value 直接返回
//  true，否则继续递归，如果数组递归结束（不构成 Arr extends [xxx] 的形式）说明递归完了还没有找到相等值，直接返
// 回 false



