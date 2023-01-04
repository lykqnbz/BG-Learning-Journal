/**
  从T中，挑选一组类型可分配给U的属性。

  例如：
  type OnlyBoolean = PickByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { isReadonly: boolean; isEnable: boolean; }
 */
/* _____________ 你的代码 _____________ */

type PickByType<T, U extends string | number | boolean> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]


/* _____________ 理解备注 _____________ */
// 思路是用了K in keyof T as T[K]来对Key位置进行进一步判断，所以只要T[K] extends U 就保留，否
// 则返回 never 即可

