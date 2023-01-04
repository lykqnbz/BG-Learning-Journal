/**
  实现一个通用的RequiredByKeys<T, K>，它接收两个类型参数T和K。

  K指定应设为必选的T的属性集。当没有提供K时，它就和普通的Required<T>一样使所有的属性成为必选的。

  例如:

  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
 */
/* _____________ 你的代码 _____________ */

type Merge<T> = {
  [P in keyof T]: T[P]
}
type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<
  T & Required<Pick<T, K extends keyof T ? K : never>>
>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]

/* _____________ 理解备注 _____________ */
// Required是TS内置函数，效果为让类型属性设定为全部必选，Pick则是选择其中属性，另一个是剔除其中属性。题目是同一个Key可
// 选与必选同时存在时，合并结果是必选。上一题因为将必选+ Omit 掉了，所以可选不会被必选覆盖，但本题 Merge<Required<T> & Omit<T, K>>，
// 前面的 Required<T> 必选优先级最高，后面的 Omit<T, K> 虽然本身逻辑没错，但无法把必选覆盖为可选，因此case都不行。 思路就是
// 破解这一特征，用原始对象 & 仅包含 K 的必选对象，使必选覆盖前面的可选 Key。后者可以 Pick 出来。
