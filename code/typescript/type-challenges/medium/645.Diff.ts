/**
  获取两个接口类型中的差值属性。

  type Foo = {
    a: string;
    b: number;
  }
  type Bar = {
    a: string;
    c: boolean
  }

  type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
  type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }
 */
/* _____________ 你的代码 _____________ */

type Diff<O, O1> = {
  [K in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]:
  K extends keyof O ? O[K] :
  K extends keyof O1 ? O1[K] : never
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


/* _____________ 理解备注 _____________ */
// diff计算本质是寻找O,O1互相存在和不存在的值，可以利用之前的Exclude<X,Y>,它可以得到存在于X不存在于Y的值，只要用keyof O、keyof O1代替X与Y，并
// 交替O、O1位置就能得到想要的差异值。另外可以使用extends keyof 来确保访问下标索引是在对象中存在的。
// 
