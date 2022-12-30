/**
  用kebab-case替换camelCase或PascalCase字符串。
  FooBarBaz -> foo-bar-baz

  例如

  type FooBarBaz = KebabCase<"FooBarBaz">;
  const foobarbaz: FooBarBaz = "foo-bar-baz";

  type DoNothing = KebabCase<"do-nothing">;
  const doNothing: DoNothing = "do-nothing";
 */
/* _____________ 你的代码 _____________ */

type Word = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type KebabCase<T extends string, S extends string = ''> = T extends `${infer F}${infer K}` ?
  F extends Word ? KebabCase<K, `${S}-${Lowercase<F>}`> : `${KebabCase<K, `${S}${F}`>}` : S extends `-${infer D}` ? D extends '' ? '-' : D : S;


// type KebabCase<S> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


/* _____________ 理解备注 _____________ */
// 思路是用自定义的第二个参数存储结果，用递归的方式遍历字符串，遇到大写字母就转成小写并添加上-，最后把开头的 - 干掉就行了，并且要注意只有-的情况。
// 首先KebabCase每次递归取第一个字符，我是使用Word大写字母字面量集合来判断大写的，有点笨逼，后面查了下可以使用Lowercase<F> extends F只要小写不
// 等于原始值就是大写来判断，所以判断条件就是的false 分支。最后在 把字符串第一个-干掉以及兼容只有-的情况即可
