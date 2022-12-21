/**
  实现内置的 Parameters 类型，而不是直接使用它，可参考TypeScript官方文档。

  例如：

  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
*/

/* _____________ 你的代码 _____________ */

type MyParameters<T> = T extends (...args: infer K) => any ? K : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const foo = (arg1: string, arg2: number): void => { }
const bar = (arg1: boolean, arg2: { a: 'A' }): void => { }
const baz = (): void => { }

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

/* _____________ 理解备注 _____________ */
//  因为可以直接拿到函数的参数类型，直接用infer实现就可以了
