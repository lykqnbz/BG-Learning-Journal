/**
  实现 ReplaceAll<S, From, To> 将一个字符串 S 中的所有子字符串 From 替换为 To。

  例如

  type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
 */
/* _____________ 你的代码 _____________ */

// type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : (S extends `${infer T}${From}${infer K}` ? ReplaceAll<`${T}${To}${K}`, From, To> : S)
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : (S extends `${infer T}${From}${infer K}` ? `${T}${To}${ReplaceAll<K, From, To>}` : S)


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

/* _____________ 理解备注 _____________ */
// 这题和replace不同之处在于替换全部，思路是用递归，利用infer From能否匹配到作为判断条件。最后所以加一层三元判断 From extends '' 进行空值判断即可
// 注意是做第二层递归的时候为了防止替换完后结果可以再度匹配，递归形式需要在下次递归直接从剩余部分开始匹配
