/**
  从T中，挑选一组类型不能分配给U的属性。

  例如：

  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
 */
/* _____________ 你的代码 _____________ */

type OmitByType<T, U extends string | number | boolean> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
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
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>>,
]


/* _____________ 理解备注 _____________ */
// 这题和PickByType要求相反，用了K in keyof T as T[K]来对Key位置进行进一步判断，所以只要T[K] extends U 就剔除，否
// 则返回Key即可

