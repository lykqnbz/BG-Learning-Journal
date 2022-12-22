/**
  实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。

  您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

  例如

  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
 */
/* _____________ 你的代码 _____________ */

// type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends Object ? DeepReadonly<T[K]> : T[K] }
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends Object ? T[K] extends Function ? T[K] : DeepReadonly<T[K]> : T[K] }

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

/* _____________ 理解备注 _____________ */
// 这题肯定需要用类型递归实现了，既然要递归，肯定不能依赖内置 Readonly 函数，我们需要将函数展开手写。因为题目只限定了处理对象情况extends Object来实现入参限制.
// 题目要求只限制对象，结果例子有函数。三元表达式多一层函数判断就好了。
