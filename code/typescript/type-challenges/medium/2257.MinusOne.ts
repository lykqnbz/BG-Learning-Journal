/**
  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

  例如:

  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
 */
/* _____________ 你的代码 _____________ */


type MinusOne<T extends number, A extends string[] = []> = T extends 0 ? -1 : ['😊', ...A]['length'] extends T ? A['length'] : MinusOne<T, ['😊', ...A]>

// type CountTo<
//   T extends string,
//   Count extends 1[] = []
// > = T extends `${infer First}${infer Rest}`
//   ? CountTo<Rest, N<Count>[keyof N & First]>
//   : Count
// type N<T extends 1[] = []> = {
//   '0': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
//   '1': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1]
//   '2': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1]
//   '3': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1]
//   '4': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1]
//   '5': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1, 1]
//   '6': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1, 1, 1]
//   '7': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1, 1, 1, 1]
//   '8': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1, 1, 1, 1, 1]
//   '9': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// }


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ 理解备注 _____________ */
// 查询了下TS没有像JS一样普通的的运算能力，但涉及数字却有一条生路，即TS可通过 ['length'] 访问数组长度，几
// 乎所有数字计算都是通过它推导出来的，这题的开始的时候以为很简单思路是构造一个长度为泛型长度 -1 的数组，获
// 取其 ['length'] 属性，但该方案有多个个硬伤，首先无法计算负值，因为数组长度不可能小于 0，其次没有通
// 过 MinusOne<1101> 测试，因为递归 1000 次就是上限了(而且导致IDE巨卡)。看了下参考答案，大神的思路：
// 就是可以高效的实现 CountTo<'1000'> 产生长度为 1000，每项为 1 的数组，更具体一点，只需要遍历 <T> 字符串长度
// 次数，比如 1000 只要递归 4 次，而 10000 也只需要递归 5 次。CountTo 函数体的逻辑是，如果字符串 T 非空，就拆
// 为第一个字符 First 与剩余字符 Rest，然后拿剩余字符递归，但是把 First 一次性生成到了正确的长度。最核心的逻辑
// 就是函数 N<T> 了，它做的其实是把 T 的数组长度放大 10 倍再追加上当前数量的 1 在数组末尾。而 keyof N & First
// 本意就是访问 First 下标，但 TS 不知道它是一个安全可访问的下标，而 keyof N & First 最终值还是 First，也可以
// 被 TS 安全识别为下标
