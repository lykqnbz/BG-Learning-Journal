/**
  实现一个通用的类型 Mutable<T>，使类型 T 的全部属性可变（非只读）。

  例如：

  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
 */
/* _____________ 你的代码 _____________ */

type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]

/* _____________ 理解备注 _____________ */
// 说实话开始还真没有什么思路，看了答案才知道有-readonly这样的写法

