/**

实现通用的ClassPublicKeys<T>，返回一个类的所有公钥

示例：
class A {
  public str: string
  protected num: number
  private bool: boolean
  getNum() {
    return Math.random()
  }
}

type publicKyes = ClassPublicKeys<A> // 'str' | 'getNum'

 */
/* _____________ 你的代码 _____________ */

type ClassPublicKeys<T> = keyof T


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type cases = [
  Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>,
]

/* _____________ 理解备注 _____________ */
// 在TS中，当你写一个类A时，在其类型系统中定义了两个类型：
// A是类A的实例的类型
// typeof A是类对象的类型，比如class A
// 所以，类A的任何实例只是一个对象，keyof关键字就会返回其公共字段。