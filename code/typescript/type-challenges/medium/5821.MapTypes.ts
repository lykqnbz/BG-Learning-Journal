/**
   实现MapTypes<T, R>，它将把对象T中的类型转换为由类型R定义的不同类型，其结构如下

  type StringToNumber = {
    mapFrom: string; // value of key which value is string
    mapTo: number; // will be transformed for number
  }

  例如：

  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }

  请注意，用户可以提供一个类型的联合。

  type StringToNumber = { mapFrom: string; mapTo: number;}
  type StringToDate = { mapFrom: string; mapTo: Date;}
  MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }

  如果该类型在我们的map中不存在，就保持原样
  
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }


 */
/* _____________ 你的代码 _____________ */

type Transform<R extends { mapFrom: any; mapTo: any }, T> = R extends any
  ? T extends R['mapFrom']
  ? R['mapTo']
  : never
  : never

type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [K in keyof T]: [T[K]] extends [R['mapFrom']] ? Transform<R, T[K]> : T[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]

/* _____________ 理解备注 _____________ */
// 信心恢复题做完再接着做这题直接没信心了。题目要求好复杂。看了参考答案晕了，mapFrom和mapTo居然是固定写死的
// 参考答案思路：因为要返回一个新对象，所以使用 { [K in keyof T]: ... } 的形式描述结果对象。然后就要对 Value
//  类型进行判断，为了防止 never 的作用，我们包一层数组进行判断：
// type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
//   [K in keyof T]: [T[K]] extends [R['mapFrom']] ? R['mapTo'] : T[K]
// }
// 但这个解答还有一个 case 无法通过
// MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
// 需要考虑到 Union 分发机制以及每次都要重新匹配一次是否命中 mapFrom，因此需要抽一个Transform函数，
// R extends any写是因为R 是联合类型，这样可以触发分发机制，让每一个类型独立判断。
