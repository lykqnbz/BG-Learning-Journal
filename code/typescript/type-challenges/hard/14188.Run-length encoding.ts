/**
枚举是 TypeScript 的一种原生语法（在 JavaScript 中不存在）。因此在 JavaScript 中枚举会被转成如下形式的代码：

let OperatingSystem
;(function (OperatingSystem) {
  OperatingSystem[(OperatingSystem['MacOS'] = 0)] = 'MacOS'
  OperatingSystem[(OperatingSystem['Windows'] = 1)] = 'Windows'
  OperatingSystem[(OperatingSystem['Linux'] = 2)] = 'Linux'
})(OperatingSystem || (OperatingSystem = {}))
在这个问题中，你实现的类型应当将给定的字符串元组转成一个行为类似枚举的对象。此外，枚举的属性一般是 pascal-case 的。

Enum<['macOS', 'Windows', 'Linux']>
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
如果传递了第二个泛型参数，且值为 true，那么返回值应当是一个 number 字面量。

Enum<['macOS', 'Windows', 'Linux'], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }

 */
/* _____________ 你的代码 _____________ */

type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [K in keyof T as K extends `${infer First extends number}` ? Capitalize<T[K]> : never]:
  N extends true ? K extends `${infer First extends number}` ? First : never
  : T[K];
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
    Enum<typeof OperatingSystem>,
    {
      readonly MacOS: 'macOS'
      readonly Windows: 'Windows'
      readonly Linux: 'Linux'
    }
  >>,
  Expect<Equal<
    Enum<typeof OperatingSystem, true>,
    {
      readonly MacOS: 0
      readonly Windows: 1
      readonly Linux: 2
    }
  >>,
  Expect<Equal<
    Enum<typeof Command>,
    {
      readonly Echo: 'echo'
      readonly Grep: 'grep'
      readonly Sed: 'sed'
      readonly Awk: 'awk'
      readonly Cut: 'cut'
      readonly Uniq: 'uniq'
      readonly Head: 'head'
      readonly Tail: 'tail'
      readonly Xargs: 'xargs'
      readonly Shift: 'shift'
    }
  >>,
  Expect<Equal<
    Enum<typeof Command, true>,
    {
      readonly Echo: 0
      readonly Grep: 1
      readonly Sed: 2
      readonly Awk: 3
      readonly Cut: 4
      readonly Uniq: 5
      readonly Head: 6
      readonly Tail: 7
      readonly Xargs: 8
      readonly Shift: 9
    }
  >>,
]

/* _____________ 理解备注 _____________ */
// 这题目里的case怎么也感觉莫名其妙的，强行输出？大致意思就是把字面量类型集合转换成只读的对象类型
// key值是首字母大些的字面量集合value值，value值根据传入的第二个参数更变。思路是递归目标数组，配合
// readonly和Capitalize完成左边key值的固定，右边则根据入参情况，键入字符串还是数字。数字需要从0
// 开始逐个递加，利用K extends `${infer First extends number}`来推到取得T是数组，K是索引0123，
// 这个是TS4.7和TS4.8里更新的内容：
// 4.7 版本中 TypeScript 支持了 infer extends 语法，使得我们可以直接一步就 infer 到预期类型的值，而不需要再次进行条件语句判断
// 4.8 版本在此基础上进行了进一步地增强，当 infer 被约束为一个原始类型，那么它现在会尽可能将 infer 的类型信息推导到字面量类型的级别