/**
  实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

  例如:

  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
 */
/* _____________ 你的代码 _____________ */

// #1
// type AppendToObject<T extends object, U extends number | string | symbol, V> = {
//   [K in keyof T | U] : K extends keyof T ? T[K] : V
// }

// #2
type AppendToObject<T extends object, U extends number | string | symbol, V, Obj = T & Record<U, V>> = {
  [K in keyof Obj]: Obj[K]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]

/* _____________ 理解备注 _____________ */
// 思路是K in Key 可以给对象拓展某些指定Key，把原始对象和新Key, Value合在一起描述表达，写了另一种在入参时就用Record函数组合成新集合体。
// 特别注意的是要限制第一个泛型为对象类型以及第二个泛型为key值类型
