/**
   实现类型版本的 Array.unshift。

  例如：

  type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
*/

/* _____________ 你的代码 _____________ */

type Unshift<T extends any[], U> = [U, ...T]


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]

/* _____________ 理解备注 _____________ */
// JS 版本
// function Push(list, key) {
//    if (Array.isArray(list)) {
//       return [ key,...list]
//    }
// }
// 这题比较简单，入参判断一下直接前置解构就好
