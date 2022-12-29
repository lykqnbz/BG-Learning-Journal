/**
  键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。

  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
 */
/* _____________ 你的代码 _____________ */

declare function PromiseAll(values: any): any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]

/* _____________ 理解备注 _____________ */
// 要是实现的功能和ES6的Promise.all的功能一致，需要正确处理参数和返回类型。
// todo 这题暂时不太理解为啥Promise.reselove(3)会转变成类型而不是字面量类型，搁置一下
