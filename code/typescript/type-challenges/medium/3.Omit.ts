/**
  不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。

  Omit 会创建一个省略 K 中字段的 T 对象。

  例如：

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
 */
/* _____________ 你的代码 _____________ */

// type MyOmit<T, K extends keyof T> = { [P in keyof T]: P extends K ? never : T[P] }
// type MyOmit<T, K extends keyof T> = { [P in (keyof T extends K ? never : keyof T)]: T[P] }
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }

type Exclude<T, U> = T extends U ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

/* _____________ 理解备注 _____________ */
// 实现Omit<T, K>，作用恰好与Pick<T, K>相反，排除对象T中的K的key
// 最开始尝试的是 type MyOmit<T, K extends keyof T> = { [P in keyof T]: P extends K ? never : T[P] }
// 其实仍然包含了description和title 这两个Key，只是这两个Key类型为never，不符合要求。所以只要P in keyof T 写出来了，后面怎么写都无法将这个Key抹去
// 尝试对Key进行改造 type MyOmit<T, K extends keyof T> = { [P in (keyof T extends K ? never : keyof T)]: T[P] }。但是即把 keyof T 中归属
// 于K的排除，但因为括号内前后 keyof T 并没有关联起来，所以需要使用exclude将前后 keyof T表达为同一个指代。
