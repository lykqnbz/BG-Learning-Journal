/**
  实现AllCombinations<S>类型，返回最多使用一次S中的字符的所有字符串组合。

  例如：

  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'

 */
/* _____________ 你的代码 _____________ */

type StrToUnion<S> = S extends `${infer F}${infer R}`
  ? F | StrToUnion<R>
  : never
type AllCombinations<S extends string, U extends string = StrToUnion<S>> = [
  U
] extends [never]
  ? ''
  : '' | { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ 理解备注 _____________ */
// 这题实现的是对字符串 S 的全排列，自己的思路只能想到把 ABC 字符串拆成一个个独立的联合类型，进行二次组合才可能完成全排列
// type StrToUnion<S> = S extends `${infer F}${infer R}`
//   ? F | StrToUnion<R>
//   : never
// infer 描述字符串时，第一个指向第一个字母，第二个指向剩余字母；对剩余字符串递归可以将其逐一拆解为单个字符并用 | 连接：
// StrToUnion<'ABCD'> // 'A' | 'B' | 'C' | 'D'
// 然后就只能看下大佬们的参考答案思路了，大致表达为接着StrToUnion，把其结果记为U，利用对象转联合类型特征，可以制造出
//  ABC 在三个字母时的全排列
// { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U] // `ABC${any}` | `ACB${any}` | `BAC${any}` | `BCA${any}` | `CAB${any}` | `CBA${any}`
// 最后在每次递归时巧妙的加上 '' | 就可以直接得到答案了：
// type AllCombinations<S extends string, U extends string = StrToUnion<S>> =
//   | ''
//   | { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U]
// ？？？(下面是大佬解释)
// 因为每次递归时都会经历 ''、'A'、'AB'、'ABC' 这样逐渐累加字符的过程，而每次都会遇到 '' | 使其自然形成了联合类型，比
// 如遇到 'A' 时，会自然形成 'A' 这项联合类型，同时继续用 'A' 与 Exclude<'A' | 'B' | 'C', 'A'> 进行组合。更精妙的是
// ，第一次执行时的 '' 填补了全排列的第一个 Case。最后注意到上面的结果产生了一个
//  Error："Type instantiation is excessively deep and possibly infinite"，即这样递归可能产生死循环，因为 Exclude<U, K>
// 的结果可能是 never，所以最后在开头修补一下对 never 的判否，never 不会进行联合类型展开，所以我们用 [never] 判断来规避
