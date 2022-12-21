/**
  在类型系统里实现通用的 Array.push 。

  例如：

  type Result = Push<[1, 2], '3'> // [1, 2, '3']
*/

/* _____________ 你的代码 _____________ */

type Push<T extends any[], U> = [...T, U]


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

/* _____________ 理解备注 _____________ */
// JS 版本
// function Push(list, key) {
//    if (Array.isArray(list)) {
//       return [...list, key]
//    }
// }
// 这题比较简单，入参判断一下直接解构就好
