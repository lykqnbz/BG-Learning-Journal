/**
  实现一个接收string,number或bigInt类型参数的Absolute类型,返回一个正数字符串。

  例如

  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
 */
/* _____________ 你的代码 _____________ */

// #1
// type Number = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// type Absolute<T extends number | string | bigint> = `${T}` extends `${infer F}${infer K}` ?
//   `${F}` extends `-` ?
//   `${Absolute<K>}` : `${F}` extends Number ?
//   `${F}${Absolute<K>}` : `${Absolute<K>}`
//   : '';

// #2
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer K}` ? `${K}` : `${T}`;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ 理解备注 _____________ */
// 写了两种答案，第一种是利用infer逐个字段递归，检查是否符合Number字面量类型里的值，然后再组合在一起
// 第二种其实是第一种的升级版本，通过模板字符串，将数字、Bigint 转换为字符串，并且会自动去除 bigint 中的 _ 和 n，然后通过 infer 去除 - 即可
