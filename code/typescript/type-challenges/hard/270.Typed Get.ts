/**

lodash中的get函数对于访问JavaScript中的嵌套值是一个相当方便的帮助工具。然而，当我们来到TypeScript时，
使用这样的函数会使你失去类型信息。有了TS 4.1即将推出的模板字面类型功能，正确输入get成为可能。你能实现它吗？

示例：
type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
}
  
type A = Get<Data, 'hello'> // 'world'
type B = Get<Data, 'foo.bar.count'> // 6
type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }

不需要考虑数组
 */
/* _____________ 你的代码 _____________ */

type Get<T, K> = K extends keyof T ? T[K] : K extends `${infer F}.${infer R}` ? (F extends keyof T ? Get<T[F], R> : never) : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}

/* _____________ 理解备注 _____________ */
// 这题思路是要对Data对象第一层做特殊处理直接利用keyof 去看是否匹配，之后的层级就利用字符模板infer
// 去匹配小数点的前后字符串，匹配到了再去拿到key获取数值，否则就匹配到底返回never