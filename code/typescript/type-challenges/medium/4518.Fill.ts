/**
  Fill是一个常见的JavaScript函数，现在让我们用类型来实现它。Fill<T, N, Start?, End?>，正如你所看到的，
  Fill接受四种类型的参数，其中T和N是必填参数，Start和End是可选参数。对这些参数的要求是。T必须是一个元组，
  N可以是任何类型的值，Start和End必须是大于或等于0的整数。

  例如：

  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]

  为了模拟真实的功能，测试可能包含一些边界条件，我希望你能喜欢它:)

 */
/* _____________ 你的代码 _____________ */

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  I extends any[] = [],
  Flag extends boolean = I['length'] extends Start ? true : false
> = I['length'] extends End
  ? T
  : T extends [infer F, ...infer R]
  ? Flag extends false
  ? [F, ...Fill<R, N, Start, End, [...I, 0]>]
  : [N, ...Fill<R, N, Start, End, [...I, 0], Flag>]
  : T


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ 理解备注 _____________ */
// 这题也不太明白，只能看参考答案思路：
// 大佬思路需要用递归 + 标记下标的方式解决，即定义一个 I 表示当前递归的下标，一个标记变量Flag表示是否到
// 了要替换的下标，只要到了这个下标，该标记就永远为 true，但由于递归会不断生成完整答案，可以
// 将 T 定义为可变的，即每次仅处理第一条，如果当前标记变量Flag为 true 就采用替换值 N，否则就拿原
// 本的第一个字符，要注意标记变量Flag在 I 长度超过 Start 后就判定失败了，为了让超过后维持 true，
// 在 Flag 为 true 时将其传入覆盖后续值即可。


