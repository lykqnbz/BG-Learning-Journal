/**
  在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

  例如：

  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
*/

/* _____________ 你的代码 _____________ */

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer Rest] ? Equal<F, U> extends true ? true : Includes<Rest, U> : false


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ 理解备注 _____________ */
// JS 版本
// function Includes(list, key) {
//   function _(list, key) {
//     if (list.length === 0) return false
//     const [first, ...rest] = list
//     if (first === key) {
//       return true
//     } else {
//       return _(rest, key)
//     }
//   }
//   return _(list, key)
// }
// ES6新进的rest关键字，可以代替原来的arguments，并且可以结合关键字first一起使用可以达到数组前置取值的效果。
// 这题自己写的怎么都对不上测试用例，看了答案后其整体思路为每次取数组第一个值判断Equal，利用Equal内部isTypeIdenticalTo 函数解决true、false都继承自boolean导致使
// 用extends判断的界限太宽的问题来完成判断，如果不匹配则拿剩余项递归判断。
