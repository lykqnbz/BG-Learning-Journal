/**
// 将类型为字面类型（标签类型）的属性，转换为基本类型。

type PersonInfo = { name: 'Tom', age: 30, married: false, addr: { home: '123456', phone: '13111111111' } }

// 要求结果如下： type PersonInfo = { name: string, age: number, married: boolean, addr: { home: string, phone: string } }

 */
/* _____________ 你的代码 _____________ */

type Number<T> = T extends number ? number : never
type String<T> = T extends string ? string : never
type Boolean<T> = T extends boolean ? boolean : never
type IsType<T> = T extends number | string | boolean ? Number<T> | String<T> | Boolean<T> : T

type ToPrimitive<T> = T extends Record<any, any>
  ? { [K in keyof T]: ToPrimitive<T[K]> }
  : IsType<T>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

/* _____________ 理解备注 _____________ */
// 思路是先抽取每个类型数数字，字符串，布尔类型的判断函数，再抽取一个用于归总的IsType函数，如果符合上述
// 三种类型则返回对应的父级类型结果，否则就是其本身，等待下次递归。



