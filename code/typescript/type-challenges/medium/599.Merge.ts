/**
  将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

  例如

  type foo = {
    name: string;
    age: string;
  }

  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
 */
/* _____________ 你的代码 _____________ */

type Merge<A extends object, B extends object> = {
  [K in keyof A | keyof B]: K extends keyof B ? B[K] : (
    K extends keyof A ? A[K] : never
  )
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


/* _____________ 理解备注 _____________ */
// 思路是K in keyof可以给对象拓展某些指定Key，然后B泛型在三元判断中优先于A泛型实现第二个类型的键会覆盖第一个类型的键的需求。
// 只要知道 in keyof支持元组，值部分用extends进行区分即可。
