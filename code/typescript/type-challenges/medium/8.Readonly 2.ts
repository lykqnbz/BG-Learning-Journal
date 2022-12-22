/**
  实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。

  K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

  例如

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
 */
/* _____________ 你的代码 _____________ */

type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ 理解备注 _____________ */
// 因为readonly必须定义在Key位置，但又没法在这个位置做三元判断。但是利用之前做的 Pick、Omit 以及内置的 Readonly 组合一下就可以了。
// 我们可以将对象一分为二，先Pick出K的Key部分设置为Readonly，再用 & 合并上剩下的Key，正好用到上一题的函数的Omit效果。
// 最后要注意case1里给K设置一个默认值T，实现未提供K，则应使所有属性都变为只读的效果
