/**
  在类型系统中实现类似于 Python 中 any 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 true，否则返回 false。如果数组为空，返回 false。

  例如：

  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
 */
/* _____________ 你的代码 _____________ */

type isFalse = 0 | '' | false | [] | never | undefined | null | Record<PropertyKey, never>
type AnyOf<T extends readonly any[]> = T extends isFalse[] ? false : true

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]


/* _____________ 理解备注 _____________ */
// 思路是判断数组内任意元素是否满足某个条件，用递归的方式解决，具体是先判断数组第一项，如果满足则继续递归判断剩余项，否则终止判断。可以使
// 用extends Array<>，让TS自动遍历，也可以用之前的infer来便利。然后是判断任意项为真，例举一个符合条件的isFalse数据组，特别要注意{}不能
// 代表空对象，{}代表的是所有对象类型，{ a: 1 } extends {} 结果为真。所以要用Record<PropertyKey, never>以锁定空对象
