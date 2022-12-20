/**
  在类型系统里实现 JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

  例如：

  type Result = Concat<[1], [2]> // expected to be [1, 2]
*/

/* _____________ 你的代码 _____________ */

type Concat<T extends any[], U extends any[]> = [...T, ...U]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]



/* _____________ 理解备注 _____________ */
// JS 版本
// function Concat(arrA, arrB) {
//   return [...arrA, ...arrB]
// }
// TS支持ES6的解构，考虑到Concat函数应该也能接收非数组类型，所以做一个判断。