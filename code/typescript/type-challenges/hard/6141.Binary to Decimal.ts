/**

实现BinaryToDecimal<S>，它接收一个由0和1组成的精确字符串类型S，当S被视为二进制时，
返回一个与S对应的精确数字类型。你可以假设S的长度等于或小于8，并且S不是空的。

示例：
type Res1 = BinaryToDecimal<'10'>; // expected to be 2
type Res2 = BinaryToDecimal<'0011'>; // expected to be 3

 */
/* _____________ 你的代码 _____________ */


type BinaryToDecimal<T extends string, U extends any[] = []> =
  T extends `${infer K}${infer R}`
  ? K extends '1'
  ? BinaryToDecimal<R, [...U, ...U, 1]>
  : BinaryToDecimal<R, [...U, ...U]>
  : U['length']


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'101'>, 5>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]

/* _____________ 理解备注 _____________ */
// 题目要求把01字符串看成二进制然后转换成十进制输出，思路就是从左边开始递归遍历
// 字符串，如果是1则往辅助存储遍历U存入[...R,...R,1]，这个思路很牛逼，我
// 也是看了参考答案才想通的，原理就是因为K只会是0或者1，所以单次往R里存储的集合
// 递增的十进制值只会是+2或者+1的相关运算根方，最后得到的U['length']就是我们要
// 的十进制输出数值
