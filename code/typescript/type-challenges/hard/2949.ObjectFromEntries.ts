/**

实现Object.fromEntries的类型版本

示例：
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type result = ObjectFromEntries<ModelEntries> // expected to be Model

 */
/* _____________ 你的代码 _____________ */

type ObjectFromEntries<T extends any[]> = {
  [K in T[0]]: Extract<T, [K, unknown]>[1]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

/* _____________ 理解备注 _____________ */
// 做的这几题需要熟练运用Pick、Omit、Extract和Exclude，这题利用了Extract的特性，他可以提
// 取Type中所有能够赋值给Union的属性，将这些属性构成一个新的类型,一般是用于交集获取，之后再
// 通过[0][1]分别获取到key value值，实现case里的要求。