/**
  实现 IsUnion 判断是否为联合类型

  实例:

  type case1 = IsUnion<string>  // false
  type case2 = IsUnion<string|number>  // true
  type case3 = IsUnion<[string|number]>  // false
 */
/* _____________ 你的代码 _____________ */

type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<A, B = A> = IsNever<A> extends true ? false : (
  A extends A ? (
    [B] extends [A] ? false : true
  ) : false
)

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ 理解备注 _____________ */
// 说实话，这题我是没太看懂，TS肯定知道传入类型是否为联合类型，并且会对联合类型进行特殊处理。
// 看了参考答案，大致意思是在没有暴露联合类型的判断语法时，所以只能对传入类型进行测试，推断是否为联合类型
// 能想到联合类型的特征只有两个：1，在 TS 处理泛型为联合类型时进行分发处理，即将联合类型拆解为独立项一一进
// 行判定，最后再用 | 连接。2.用 [] 包裹联合类型可以规避分发的特性。所以可以知道如果泛型进行了分发，就可以
// 反推出它是联合类型。
// 参考答案大神的思路是要利用包裹 [] 不分发的特性，即在分发后，由于在每次执行过程中，第一个 A 都是联合类型
// 的某一项，因此用 [] 包裹后必然与原始值不相等，所以我们在 extends 分发过程中，再用 [] 包裹 extends 一次，
// 如果此时匹配不上，说明产生了分发
// case里有个never的情况，用上一题的IsNever 函数提前判否即可