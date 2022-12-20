/**
  实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

  例如：

  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
*/

/* _____________ 你的代码 _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>


/* _____________ 理解备注 _____________ */
// JS 版本
// function If(C,T,F){
//   if(C typeof boolean){
//     return C ? T : F
//   }
// }
// extends可以用来判定值，所以用extends boolean 和 extends true 判断是传入参数是否合规以及是否命中了入参要求
