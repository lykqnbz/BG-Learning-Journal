/**
  实现 TupleToNestedObject<T, U>，其中 T 仅接收字符串数组，U 是任意类型，生成一个递归对象结构，满足如下结果：

  例如：

  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
 */
/* _____________ 你的代码 _____________ */

type TupleToNestedObject<T, U, R = U> = T extends [] ? R : (
  T extends [...infer Rest, infer Last extends PropertyKey] ? (
    TupleToNestedObject<Rest, U, {
      [P in Last]: R
    }>
  ) : never
)

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ 理解备注 _____________ */
// 这题非常的综合：递归、辅助类型、infer、in Key、PropertyKey，首先因为返回值是个递归对象，递归过程
// 中必定不断修改它，因此给泛型添加第三个参数 R 存储这个对象，并且在递归数组时从最后一个开始，这样从
// 最内层对象开始一点点把它包起来:type TupleToNestedObject<T , U , R = []>，然后描述一个对象Key用
// P in Last，并且要申明 Last extends PropertyKey限制一下入参问题。最后再处理一下递归结束条件，即
// T 变成空数组时直接返回 R。

