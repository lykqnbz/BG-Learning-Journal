/**

从一个字符串中删除指定的字符。

示例：

type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'

 */
/* _____________ 你的代码 _____________ */

type StringToTuple<S extends string> = S extends `${infer H}${infer T}` ? [H, ...StringToTuple<T>] : []
type StringToUnion<S extends string> = StringToTuple<S>[number]
type Shift<A extends unknown[]> = A extends [unknown, ...infer T] ? T : []
type Join<A extends string[], S extends string = ""> = A extends [] ? S : Join<Shift<A>, `${S}${A[0]}`>
type DropString<S extends string, M extends string, ST extends string[] = StringToTuple<S>, R extends string[] = []> = ST extends []
  ? Join<R>
  : ST[0] extends StringToUnion<M>
  ? DropString<S, M, Shift<ST>, R>
  : DropString<S, M, Shift<ST>, [...R, ST[0]]>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

/* _____________ 理解备注 _____________ */
// 这题试着拆分思路写，最开始写了一坨，不太美观。主体思路按方法抽离了出来，StringToTuple先是拆分
// 字符串，然后再利用StringToUnion去除重复的元素，在用Shift去除数组内左边第一个元素，最后使用
// Join将字符串与字符串数组内的元素依次连接在一起
