/**
  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

  例如:

  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
 */
/* _____________ 你的代码 _____________ */

type Flatten<T extends any[], K extends any[] = []> = T extends [infer M, ...infer N] ? M extends any[] ? Flatten<N, [...K, ...Flatten<M>]> : Flatten<N, [...K, M]> : K


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

/* _____________ 理解备注 _____________ */
// 整体思路和上题差不多递归时如果需要存储临时变量，用泛型默认值来存储，只是这次从字符串更替成了数组
// 用这个泛型存储打平后的结果，每次拿到数组第一个值，如果第一个值不是数组，则直接存进去继续递归，此时T自然是剩余的N，如果第一个值是数组，则将其打平
// 如果打平后还是数组，则需要复用递归
