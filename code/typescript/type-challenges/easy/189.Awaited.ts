/**
  假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

  例如：Promise<ExampleType>，请你返回 ExampleType 类型。

  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
*/

/* _____________ 你的代码 _____________ */

type MyAwaited<T> = T extends Promise<infer P> ? MyAwaited<P> : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>


/* _____________ 理解备注 _____________ */
// 直接一点可以使用官方工具类ReturnType的基础上进行改造来实现:如果入参 P 的返回类型是泛型 Promise 的实例，则返回 Promise 接收的入参
// 正常的话就是 infer + 递归 + Promise
// 对于普通的类型，例如type X = Promise，用T extends Promise 即可判断出。
// 但是对于嵌套类型，例如type Z = Promise<Promise<string | number>>，需要再判断一下P是否为Promise类型，若是的话，递归判断。
// ————————————————

