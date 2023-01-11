/**

创建一个类型安全的字符串连接工具，可以像这样使用。

const hyphenJoiner = join('-')
const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'

或者说是。

join('#')('a', 'b', 'c') // = 'a#b#c'

当我们传递一个空的分隔符（即''）来连接时，我们应该按原样连接这些字符串，即

join('')('a', 'b', 'c') // = 'abc'

而一个联合类型可能会发生碰撞，这意味着一些类型可能会吸收（或被）其他类型吸收，而且没有办法防止这种吸收。请看下面的例子。

join('-')('a') // = 'a'

 */
/* _____________ 你的代码 _____________ */


type Join<T extends any[], D extends string> = T extends [infer F extends string, ...infer R]
  ? `${F & string}${R['length'] extends 0 ? '' : `${D}${Join<R, D>}`}`
  : ''

declare function join<T extends string>(delimiter: T): <P extends string[]>(...args: P) => Join<P, T>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]

/* _____________ 理解备注 _____________ */
// 做了这么多题终于有一题是要求将type声明成方法后来使用的了，学习到了。这题思路就是在type join里对T进行
// infer 递归，逐个讲P塞到每个元素中间，利用R['length'] extend 0 来判断后续字符串度，并且解决最后一个
// 元素的边界问题，然后学到了新的写法infer F extends string 可以写成在三元后置里${F & string}，效果是
// 一直的。如果是T是单个元素的要注意忽略P值的插入，实现case的要求