/**
  实现 CamelCase<T> ，将 snake_case 类型的表示的字符串转换为 camelCase 的表示方式。

  例如

  type camelCase1 = CamelCase<"hello_world_with_types"> // 预期为 'helloWorldWithTypes'
  type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES"> // 期望与前一个相同

 */
/* _____________ 你的代码 _____________ */

type CamelCase<S extends string, R extends string = ''> =
  Lowercase<S> extends `${infer Frist}${infer Sencond}_${infer Last}${infer Rest}`
  ? CamelCase<Rest, `${R}${Frist}${Sencond}${Uppercase<Last>}`>
  : `${R}${Lowercase<S>}`


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]
/* _____________ 理解备注 _____________ */
// 这题有说实话有点偷鸡解答，总体思路和上题一样利用字符串递归和内置函数Uppercase,Lowercase以及
// 辅助函数存储结果，然后根据case里有XXX_XXX_XXX的特性直接在字符模板里固化模板infer递归搜索最后
// 利用Lowercase和Uppercase比较是否是英文还是符号来达到符合题目的要求
