/**
  Currying 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

  例如：

  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  传递给 Currying 的函数可能有多个参数，您需要正确键入它。

  在此挑战中，curried 函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。

 */
/* _____________ 你的代码 _____________ */

type currying<F extends Function> = F extends (first: infer First, ...args: infer Rest) => infer Ret
  ? Rest['length'] extends 0
  ? F
  : (first: First) => currying<(...args: Rest) => Ret>
  : never

declare function Currying<F extends Function>(f: F): currying<F>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>>,
  Expect<Equal<typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true>>,
  Expect<Equal<typeof curried3, () => true>>,
]


/* _____________ 理解备注 _____________ */
// 柯里化这个概念对于我来说一直只存在于面试题中，实际应用确实接触得很少，或者接触到了自己
// 都不知道，其本质就如同题目所说实际上就是把接收多个参数的函数变换成接收一个单一参数（最初
// 函数的第一个参数）的函数，如果其他的参数是必要的，返回接收余下的参数且返回结果，下面是一
// 个简单的加法参数柯里化函数，示例：
// var Add = (x:number, y:number) => {
//   return x+y;
// }
// var curry = (fun) => {
//   return function(firstArg){
//       return function(secondArg){
//           return fun(firstArg,secondArg);
//       };
//   };
// };
// const autoCurriedAdd = curry(Add);
// var res = autoCurriedAdd(1)(1);
// 在这题目里在有多个参数的函数中，通过调用函数返回函数的思路，每次返回一个只带有一个变量的
// 函数，通过 infer + 递归,其中利用Rest extends [] 或者 Rest['length'] extends 0 的方法
// 来判断无剩余参数。对函数参数使用...args:infer 来逐个获取后续入参的个数及内容，本质和获取
// 数组一样，