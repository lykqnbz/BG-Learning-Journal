/**
  实现内置的Exclude <T, U>类型，但不能直接使用它本身。

  从联合类型T中排除U的类型成员，来构造一个新的类型。

  例如：

  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
*/

/* _____________ 你的代码 _____________ */

type MyExclude<T, U> = T extends U ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]


/* _____________ 理解备注 _____________ */
// JS 版本
// ["a","b","c"] ["a"]
// function MyExclude(T, U) {
//   const result = []
//   for (let i = 0; i < T.length; i++) {
//     const t = T[i];
//     let boo = false;
//     for (let j = 0; j < U.length; j++) {
//       const u = U[j]
//       if (t === u) {
//         boo = true
//       }
//     }
//     if (!boo) {
//       result.push(t)
//     }
//   }
//   return result
// }
// 对TS来说，重点是如何移除U，实现类型Exclude<T, U>，了解到的情况一般都是联合类型场景，只要T中的某一项如果在U中(T extends U)，返回never移除U，否则返回T。


