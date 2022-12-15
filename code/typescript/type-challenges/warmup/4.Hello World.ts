/**
  期望是一个 string 类型
  type HelloWorld = any

  你需要使得如下这行不会抛出异常
  type test = Expect<Equal<HelloWorld, string>>
 */

/* _____________ 你的代码 _____________ */

type HelloWorld = string

/* _____________ 测试用例 _____________ */
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]

/* _____________ 理解备注 _____________ */
// 此题无