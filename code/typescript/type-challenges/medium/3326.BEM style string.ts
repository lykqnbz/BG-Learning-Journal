/**
  块、元素、修改器方法（BEM）是CSS中类的一个流行的命名规则。

  例如，块组件可以表示为btn，依赖于块的元素可以表示为btn__price，改变块样式的修改器可以表示为btn-big或者btn__price-warning。

  实现BEM<B, E, M>，从这三个参数中生成字符串联盟。其中B是一个字符串字面，E和M是字符串数组（可以为空）。
 */
/* _____________ 你的代码 _____________ */

type IsNever<TValue> = TValue[] extends never[] ? true : false;
type SafeUnion<TUnion> = IsNever<TUnion> extends true ? "" : TUnion;

type BEM<B extends string, E extends string[], M extends string[]> = `${B}${SafeUnion<`__${E[number]}`>}${SafeUnion<`--${M[number]}`>}`

/* _____________ 测试用例 _____________ */

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]

/* _____________ 理解备注 _____________ */
// 开始题目都没读太懂，意思是按BEM函数要求完成__和--其规则拼接最后输出联合类型，最简单的方式是直接使用字符模板通过下标将数组
// 或对象转成联合类型：`${B}__${E[number]}--${M[number]}`，但是无法兼顾空值，可以在这个基础上加一层空值判断，保证当传入值
// 不存在时返回空字符串，保证安全的跳过：
// type IsNever<TValue> = TValue[] extends never[] ? true : false;
// type SafeUnion<TUnion> = IsNever<TUnion> extends true ? "" : TUnion;
// 



