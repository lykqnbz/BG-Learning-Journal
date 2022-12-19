/**
  创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。

  例如：

  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
*/

/* _____________ 你的代码 _____________ */

type Length<T extends readonly any[]> = T['length']


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ 理解备注 _____________ */
// JS 版本
// function getLength(arr) {
//   if (!Array.isArray(arr)) return
//   return arr.length
// }
// 对TS来说，元组和数组都是数组，但元组对 TS 来说可以观测其长度，T['length'] 对元组来说返回的是具体值，为了保证T上有length属性，所以要约束一定要是数组类型，然后typeof调取出来的内容具有readonly属性，所以也需要在约束中加入readonly。
