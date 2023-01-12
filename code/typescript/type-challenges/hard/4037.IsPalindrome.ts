/**

实现IsPalindrome<T>类型，以检查一个字符串或数字是否是回文。

示例：
IsPalindrome<'abc'> // false
IsPalindrome<121> // true

 */
/* _____________ 你的代码 _____________ */

type Reverse<T> = T extends `${infer A}${infer B}` ? `${Reverse<B>}${A}` : T
type IsPalindrome<T extends string | number>
  = `${T}` extends infer S ? Equal<S, Reverse<S>> : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]
/* _____________ 理解备注 _____________ */
// 先抽一个Reverse函数用于反转数组内的元素，然后按所以顺序逐个比较，本质就是原
// 数组首位元素比较，持续递归。如果出现不相同则返回false，反之递归到最
// 后就是true，特别要注意的判断相等建议使用Equal去判断，不要用extends。
// 避免大类型包含小类型的问题