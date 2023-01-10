/**
  实现CapitalizeWords<T>，它将字符串的每个单词的第一个字母转换为大写，其余部分保持原样。

  例如

  type capitalized = CapitalizeWords<"hello world, my friends"> // 预期为 'Hello World, My Friends'

 */
/* _____________ 你的代码 _____________ */


type Words<S extends string, R extends string = ''> = S extends `${infer Frist}${infer Rest}` ?
  Lowercase<Frist> extends Uppercase<Frist> ? Words<Capitalize<Rest>, `${R}${Frist}`> : Words<Rest, `${R}${Frist}`> : R
type CapitalizeWords<S extends string> = Capitalize<Words<S>>



/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]
/* _____________ 理解备注 _____________ */
// 思路是利用字符串递归和内置函数Capitalize,Uppercase,Lowercase以及辅助函数存储结果，首先利用字符串模板中
// infer的特性逐个递归，对首个字母进行大写字母改写，并且使用Lowercase<F> extends Uppercase<F>来判断转换后
// 的字符是否一致，一致则说明不是字母是空格，符号，表情之类的字符，算是巧思。