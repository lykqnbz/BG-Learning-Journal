/**
  实现Object.entries的类型版本

  例如：

  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
 */
/* _____________ 你的代码 _____________ */

type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, RemoveUndefined<T[K]>]
}[keyof T]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]

/* _____________ 理解备注 _____________ */
// Object.entries首先要知道效果是返回一个给定对象自身可枚举属性的键值对数组，这题主要问题是如何把对象转换成联合类型，没什么思路。
// 参考答案思路：对象或数组转联合类型的思路都是类似的，一个数组转联合类型用 [number] 作为下标
// ['1', '2', '3']['number'] // '1' | '2' | '3'
// 对象的方式则是 [keyof T] 作为下标： type ObjectToUnion<T> = T[keyof T]
// 然后题目的联合类型每一项都是数组，分别是 Key 与 Value，，只要构造一个 Value 是符合结构的对象即可
// type ObjectEntries<T> = { [K in keyof T]: [K, T[K]] }[keyof T]
// 为了通过单测 ObjectEntries<{ key?: undefined }>，让 Key 位置不出现 undefined，需要强制把对象描述为非可选 Key：
// type ObjectEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T]
// 为了通过单测 ObjectEntries<Partial<Model>>，得将 Value 中 undefined 移除，增加一个RemoveUndefined方法过滤
// 其中知识点是-?:字符语法的作用是标记映射类型的属性为必需。它只能在映射类型中使用，在其他类型中使用会报错，上面的
// Required<T> 就是一个映射类型 正常的 interface 接口中，如果属性不使用可选属性，就表示该属性必需了。
