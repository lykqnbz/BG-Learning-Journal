/**
  实现高级util类型GetRequired<T>，该类型保留所有必填字段

  例如

  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }

 */
/* _____________ 你的代码 _____________ */

type Required<T> = { [K in keyof T]-?: T[K] }
type GetRequired<T> = { [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] }

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


/* _____________ 理解备注 _____________ */
// 这题和59.Get Optional，89.Required Keys以及90.Optional Keys都同一个类型的题目，意在表达从
// 不同角度对同一条规则的等价描述，这四大题的关键点是：
// 1，一个 optional 字段要比一个 required 字段更加宽泛
// 2，一个 required 字段要比一个 optional 字段更加具体
// 3，如果两个对象的唯一区别是，有一个字段，它在一个对象中是 required，在另一个对象中是 optional，那么带有 required 字段的对象是带有 optional 对象的子类型
// 4，{a: 1} extends {a?: 1} 为真，但 {a?: 1} extends {a: 1} 为假
// 抽离出来的Required函数用于判断一个对象 T 中的指定字段 K 是不是 required 的。它在 extends 左
// 侧构造了一个只含有 a 字段的对象，在右侧构造了一个只含有 a 字段且强制 required 的对象利用的逻辑是：
// {a: 1} extends {a: 1} // true
// {a?: 1} extends {a: 1} // false
// 利用-? 强制让字段变成 required在和原数组进行集成比较可得题目所需答案