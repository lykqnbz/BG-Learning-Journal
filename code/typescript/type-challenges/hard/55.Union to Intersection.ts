/**
  实现高级util类型UnionToIntersection<U>

  例如

  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true

 */
/* _____________ 你的代码 _____________ */

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


/* _____________ 理解备注 _____________ */
// 之前的296.Permutation知道，TS对多个联合类型泛型处理是采用分配律的，所以这题的思路
// 是递归触发联合类型分配律，示例：
// type TEST<T> = T extends boolean ? "true" : "false"
// TEST<string | true>
// // 完全等价于
// TEST<string> | TEST<true>
// // 所以结果会是 "false" | "true"
// 所以可以利用 U extends any 遍历每一个联合类型的成员并做一些修改，可以理解成 js 中数
// 组的 map 方法，示例：
// type TEST<U> = U extends any ? ((x: U) => void) : never // 因为是 extends any，所以永远不会取到 never
// type Result = TEST<{ a: string } | { b: number }>
// Result:
// (
//   (x: { a: string }) => void
// ) | (
//   (x: { b: number }) => void
// )
// 这里还学习到两个新的概念逆变和协变，简单来说，假设存在类型 T2 为 T1 的子类，并且从 T1 派生出新类型 N<T1>以
// 及从 T2 中派生出新类型 N<T2>。如果可以将 N<T2> 的实例赋值给类型为 N<T1> 的实例，则称为协变。如果能将 N<T1>
// 的实例赋值给类型 N<T2> 的实例则称之为逆变。略抽象，在这题的应用就是利用 infer 处于逆变位置推断类型为交叉类
// 型，处于协变位置推断出类型为联合类型。

