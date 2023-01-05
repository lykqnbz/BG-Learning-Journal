/**
  递归平移数组，最多深度次数。

  例如：

  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

  如果提供了深度，保证是正整数。

 */
/* _____________ 你的代码 _____________ */

// 单次打平操作
type FlattenOnce<T extends any[], U extends any[] = []> = T extends [infer X, ...infer Y] ? (
  X extends any[] ? FlattenOnce<Y, [...U, ...X]> : FlattenOnce<Y, [...U, X]>
) : U

type FlattenDepth<
  T extends any[],
  U extends number = 1,
  P extends any[] = []
> = P['length'] extends U ? T : (
  FlattenOnce<T> extends T ? T : (
    FlattenDepth<FlattenOnce<T>, U, [...P, any]>
  )
)

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ 理解备注 _____________ */
// 这题没什么思路，看了参考答案大体想法为：因为需要控制打平的次数，就是打平 Deep 次，所以需要
// 实现打平一次的函数，再根据 Deep 值递归对应次：
// type FlattenOnce<T extends any[], U extends any[] = []> = T extends [infer X, ...infer Y] ? (
// X extends any[] ? FlattenOnce<Y, [...U, ...X]> : FlattenOnce<Y, [...U, X]>
// ) : U
// 然后再实现主函数 FlattenDepth，因为 TS 无法实现 +、- 号运算，要用数组长度判断与操作数组来辅助实现
// type FlattenDepth<T extends any[],U extends number = 1,P extends any[] = []> =
// P['length'] extends U ? T : (FlattenDepth<FlattenOnce<T>, U, [...P, any]>)
// 当递归没有达到深度 U 时，就用 [...P, any] 的方式给数组塞一个元素，下次如果能匹配上 P['length'] extends U 说明
// 递归深度已达到。但考虑到测试用例 FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817> 会引发超长次数
// 递归，需要提前终止，即如果打平后已经是平的，就不用再继续递归了，此时可以用 FlattenOnce<T> extends T 判断。
// 好绕，要好好理顺一下。
