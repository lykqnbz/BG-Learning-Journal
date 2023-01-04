/**
  实现一个通用的PartialByKeys<T, K>，它接收两个类型参数T和K。

  K指定应设置为可选的T的属性集。当没有提供K时，它就和普通的Partial<T>一样使所有属性都是可选的。

  例如:

  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
 */
/* _____________ 你的代码 _____________ */

// #1
// type PartialByKeys<T, K extends keyof T = keyof T> =
//   { [P in keyof T as P extends K ? P : never]?: T[P] } &
//   { [P in keyof T as P extends K ? never : P]: T[P] } extends infer R
//   ? { [P in keyof R]: R[P] } : never

// #2
type Merge<T> = {
  [P in keyof T]: T[P]
}
type PartialByKeys<T extends Record<PropertyKey, any>, K extends keyof T = keyof T> = Merge<{
  [P in Exclude<keyof T, K>]: T[P]
} & { [P in K]?: T[P] }>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]
/* _____________ 理解备注 _____________ */
// 首先Partial是内置函数表达的是将所有属性都设为可选属性。题目要求是不传参数时和 Partial<T> 行为一直，就应该
// 能想到应该这么起头写个默认值type PartialByKeys<T, K extends keyof T = keyof T> = {}，用可选与不可选分别描述两个对象拼起
// 来，因为 TS 不支持同一个对象下用两个 keyof 描述，所以只能写成两个对象，最后把其中一个对象 extends infer R
// 再重新展开一遍让类型上合并成了一个对象。也可以将其抽成一个函数 Merge<T> 来使用,最最后用入参Record<PropertyKey, any>
// 限制过滤case里入参有unknown的情况

