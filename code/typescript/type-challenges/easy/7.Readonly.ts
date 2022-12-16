/**
  不要使用内置的Readonly<T>，自己实现一个。

  该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。

  也就是不可以再对该对象的属性赋值。

  例如：
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
*/

/* _____________ 你的代码 _____________ */

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/* _____________ 理解备注 _____________ */
// 使用{ [A in keyof B]: B[A] }重新声明对象，并在每个Key前面加上readonly修饰，达到内置修饰的效果