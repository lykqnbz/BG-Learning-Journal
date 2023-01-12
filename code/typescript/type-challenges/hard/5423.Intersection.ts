/**

实现Lodash.intersection的类型版本，但有一点不同。Intersection接收一个包含多个数组或任何类型
元素的数组T，包括union类型，并返回一个包含所有intersection元素的新union。

示例：
type Res = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never

 */
/* _____________ 你的代码 _____________ */


type Intersection<T extends any[]> = T extends [infer First, ...infer Rest]
  ? (First extends unknown[] ? First[number] : First) & Intersection<Rest>
  : unknown


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]

/* _____________ 理解备注 _____________ */
// Lodash.intersection的作用是创建唯一值的数组，这个数组包含所有给定数组都包含的元
// 素，可以理解为给定数组的交集。首先对数组首层进行递归，如果元素是非数组，则正常判断
// 否则则继续递归，利用First extends unknown[]判断是不是数组。  

