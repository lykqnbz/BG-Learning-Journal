/**
  在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

  在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

  例如

  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 期望 result 的类型是：
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

  你可以假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。
 */

/* _____________ 你的代码 _____________ */

// type Chainable<Result = {}> = {
//   option: <K extends string, V>(key: K, value: V) => Chainable<Result & {
//     [P in K]: V
//   }>
//   get: () => Result
// }
type Chainable<Result = {}> = {
  option<K extends string, V>(key: K extends keyof Result ? never : K, value: V): Chainable<Omit<Result, K> & { [P in K]: V }>
  get: () => Result
}

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

/* _____________ 理解备注 _____________ */
// JS版本
// class ChainableOptions {
//   constructor(previous = {}) {
//     this.obj = { ...previous }
//   }
//   obj: Object
//   get() {
//     return this.obj
//   }
//   option(key: string, value: any) {
//     return new ChainableOptions({
//       ...this.obj,
//       [key]: value
//     })
//   }
// }
// const config = new ChainableOptions()
// 很惭愧，在js中没有用过Chainable/Pipeline。题目大致意思是让我们实现一个相对复杂的链式调用对象，拥有该类型的对象可以使用.option(key, value) 一直链式调用下去，直到使用 get() 后拿到聚合了所有
// option的对象。如果用JS实现该函数，需要在当前闭包存储该对象的值，然后提供get直接返回，或option递归并传入新的值。实现如上。
// TS的话说实话没什么想法，借鉴了网上大佬的方法学习一下：
//
// 基础的Chainable的框架写出来：
//  type Chainable = {
//     option: (key: string, value: any) => any
//     get: () => any
//  }
//  Chainable 必须接收一个泛型，这个泛型默认值是个空对象，所以 config.get() 返回一个空对象也是合理的：
//  type Chainable<Result = {}> = {
//    option: (key: string, value: any) => any
//    get: () => Result
//  }
// 第二步解决递归问题：
// type Chainable<Result = {}> = {
//   option: <K extends string, V>(key: K, value: V) => Chainable<Result & {
//     [P in K]: V
//   }>
//  get: () => Result
// }
// 
