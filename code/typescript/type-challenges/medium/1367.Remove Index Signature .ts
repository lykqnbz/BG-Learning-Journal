/**
  实现 RemoveIndexSignature<T> 把对象 <T> 中 Index 下标移除：

  示例：


  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
 */
/* _____________ 你的代码 _____________ */

type RemoveIndexSignature<T> = {
  // #1
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K]
  // #2
  // [K in keyof T as K extends `${infer P}` ? P : never]: T[K]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]


/* _____________ 理解备注 _____________ */
// 思路是将对象字符串Key识别出来，索引签名可以是string/number/symbol,如果识别出来的key能命中任何一个，那么它就是索引下标
// 看参考答应 使用 `${infer P}`来代替string extends/number extends/symbol extends，如果能识别到 P 来判断当前是否命中
// 了字符串 Key,同时in keysof T来逐个遍历是否属于下标
