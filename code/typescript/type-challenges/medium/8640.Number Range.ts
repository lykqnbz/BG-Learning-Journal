/**
  有时我们想限制数字的范围... 

  例如：

  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 

 */
/* _____________ 你的代码 _____________ */

// #1
// type NumberRange<L, H, R extends number = never, I1 extends any[] = [], I2 extends any[] = []> =
//   I1['length'] extends L ?
//   I2['length'] extends H ? R :
//   NumberRange<L, H, R | I2['lengrh'], [...I1], [...I2, 1]> : NumberRange<L, H, R, [...I1, 1], [...I2, 1]>
// #2
type LengthTo<N extends number, R extends any[] = []> =
  R['length'] extends N ? R : LengthTo<N, [0, ...R]>

type NumberRange<L extends number, H extends number, U extends any[] = LengthTo<L>, R extends number = never> =
  U['length'] extends H ? (
    R | U['length']
  ) : (
    NumberRange<L, H, [0, ...U], R | U['length']>
  )

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]

/* _____________ 理解备注 _____________ */
// 思路是用递归加多个辅助变量，R为存储输出结果的辅助变量，I1和I2方便存储L和H的对应数组长度，先从I1开始递归叠加
// 到L的边界值，然后再对I2开始递归叠加同时存储R的结果数据输出。
// 又写了一种#2的更简洁的解法：抽出来一个LengthTo 函数，传入长度N，返回一个长度为 N 的数组



