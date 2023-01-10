/**

有时，检测你是否有任何类型的值是很有用的。这在与第三方Typescript模块合作时特别有用，这些模块可以在模块API中导出任何值。当你压制 implicitAny 检查时，了解 any 也是很好的。

所以，让我们写一个IsAny<T>类型的实用程序，它接受输入类型T。如果T是any，返回true，否则，返回false。

 */
/* _____________ 你的代码 _____________ */


type IsAny<T> = Equal<T, any> extends true ? true : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

/* _____________ 理解备注 _____________ */
// 之前有接触到，对于层级高的父级类型比较继承关系，一般都是用Equal来锁定当前层级后来
// 确定true或false，如果直接使用extends 或牵连到父级类型的子集，或者一些顶级类型
// any，never这样的