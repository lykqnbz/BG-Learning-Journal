/**
  有时，您可能希望根据某个属性在联合类型中查找类型。

  在此挑战中，我们想通过在联合类型Cat | Dog中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望LookUp<Dog | Cat, 'dog'>获得Dog，LookUp<Dog | Cat, 'cat'>获得Cat。

  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 */
/* _____________ 你的代码 _____________ */

// #1
type LookUp<U, T> = U extends { type: infer C } ? (C extends T ? U : never) : never
// #2 大神答案
// type LookUp<U extends { type: any }, T extends U['type']> = U extends { type: T } ? U : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]


/* _____________ 理解备注 _____________ */
// 这题只要使用infer与extends可以解决，联合类型的判断是一个个来的，所以只要针对每一个单独写判断就行了。解法中，我们先利用extend和infer锁
// 定T的类型是包含type key的对象，且将infer U指向了type，所以在内部再利用三元运算符判断U extends P? 就能将type命中的类型挑出来
// 找到一位大神的另一种解法，直接在泛型处利用 extends { type: any }、extends U['type'] 直接锁定入参类型，让错误校验更早发生，T extends U['type'] 精确缩
// 小了参数T范围，可以学到的是，之前定义的泛型 U 可以直接被后面的新泛型使用U extends { type: T } 是一种新的思考角度。在我的答案中，思维方式是 “找到对象
// 中 type 值进行判断”，而大神的答案直接用整个对象结构 { type: T } 判断，是更纯粹的TS思维
