/**
  实现高级util类型GetOptional<T>，该类型保留所有可选字段

  例如

  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }

 */
/* _____________ 你的代码 _____________ */

type Required<T> = { [K in keyof T]-?: T[K] }
type GetOptional<T> = { [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K] }


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]


/* _____________ 理解备注 _____________ */
// 这题和57.Get Required，89.Required Keys以及90.Optional Keys都同一个类型的题目，中心思想可
// 看57.Get Required， // 抽离出来的Required函数用于判断一个对象 T 中的指定字段 K 是不是 required
//  的。它在 extends 字左 侧构造了一个只含有 a 段的对象，在右侧构造了一个只含有 a 字段且强制
//  required 的对象利用的逻辑是：
// {a: 1} extends {a: 1} // true
// {a?: 1} extends {a: 1} // false
// 利用-? 强制让字段变成 required在和原数组进行集成比较可得题目所需答案，最后把三元选择输出结果调换
// 下就可以了。