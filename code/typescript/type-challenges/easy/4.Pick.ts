/**
  实现 TS 内置的 Pick<T, K>，但不可以使用它。

  从类型 T 中选择出属性 K，构造成一个新的类型。

  例如：
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
 */
/* _____________ 你的代码 _____________ */
interface Todo {
  title: string
  description: string
  completed: boolean
}
// type MyPick<T, K in keyof T> = {
//   [P in K]: T[P]
// }
// type MyPick<T, K> = {
//   [P in (keyof T) & K]: T[P]
// }
type MyPick<T, K> = {
  [P in (keyof T) as (K extends P ? P : never)]: T[P]
}
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ 理解备注 _____________ */
// K是一个字符串，需要返回一个新类型，仅保留K定义的Key，并且要限制K的取值防伪在T中存在。
// 使用as重映射，再利用联合类型自动循环的功能推断出key