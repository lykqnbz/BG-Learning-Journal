/**
  实现lodash的_.flip的类型版本。

  FlipArguments<T>类型需要函数类型T，并返回一个新的函数类型，它的返回类型与T相同，但参数相反。

  例如：

  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
  // (arg0: boolean, arg1: number, arg2: string) => void

 */
/* _____________ 你的代码 _____________ */

type Reverse<T extends any[]> = T extends [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>] : T

type FlipArguments<T extends Function> = T extends (...args: infer Args) => infer Result ? (...args: Reverse<Args>) => Result : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]
/* _____________ 理解备注 _____________ */
// 我不理解为什么lodash会有这么鸡肋的flip函数，官方介绍_.flip(func)：创建一个函数，调用func时候接收翻转的参数
// flipped('a', 'b', 'c', 'd');  // => ['d', 'c', 'b', 'a']
// 根据上题Reversed的思路只是反转内容从数组变成了函数的参数，只要用 infer 定义出函数的参数，利用 Reverse 函数反转一下即可
// 最后注意errors里的入参限制

