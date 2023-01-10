/**

在C语言中有一个函数：printf。这个函数允许我们打印带有格式的东西。像这样。

printf("The result is %d.", 42);

这个挑战要求你解析输入字符串并提取格式占位符，如%d和%f。例如，如果输入的字符串是 "结果是%d."，解析后的结果是一个元组['dec']。

这里是映射:

type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}

 */
/* _____________ 你的代码 _____________ */

type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}
type ParsePrintFormat<T, R extends string[] = []> = T extends `${string}%${infer First}${infer Rest}`
  ? First extends keyof ControlsMap ? ParsePrintFormat<Rest, [...R, ControlsMap[First]]> :
  ParsePrintFormat<Rest, R> : R


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]

/* _____________ 理解备注 _____________ */
// 思路和之前做medium没什么差，利用infer在字符串模板里进行递归，逐个匹配符合%XX条件的字符后
// 再匹配ControlsMap的key值，如果也符合就塞到辅助函数里，但是这里一直有case不符合，后面看了
// 参考答案发现他们都有在 T extends `${string}%${infer First}${infer Rest}` 加${string}
// 学习到了了一下新知识点${string}用于匹配任意字符串进行 extends 判定，有点正则的意思。
// 当然 ${string} 也可以被 ${infer X} 代替，只是拿到的 X 不需要再用到了，说明字符串模板最通用的指代
// 是 ${infer X} 或 ${string}，如果要匹配特定的数字类字符串也可以混用 ${number}