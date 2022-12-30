/**
  实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

 */
/* _____________ 你的代码 _____________ */

type Permutation<T, K = T> = [T] extends [never] ? [] : T extends K ? [T, ...Permutation<Exclude<K, T>>] : []


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]


/* _____________ 理解备注 _____________ */
// 这题可以联想到之前做的Exclude, Exclude<'a' | 'b', 'a' | 'c'>等价于Exclude<'a', 'a' | 'c'> | Exclude<'b', 'a' | 'c'>，TS对多个联合类型泛型处理
// 是采用分配律的，所以这题的思路是递归触发联合类型分配律，但是之前的Exclude里使用分配律是有两个入参泛型，而题目只有一个，所以我们只能自己创造一个，使其
// 默认值等于第一个：type Permutation<T, K = T>，这样对于本题来说，会做这样的展开：
// Permutation<'A' | 'B' | 'C'>
// 等价于
// Permutation<'A' | 'B' | 'C', 'A' | 'B' | 'C'>
// 等价于
// Permutation<'A', 'A' | 'B' | 'C'> | Permutation<'B', 'A' | 'B' | 'C'> | Permutation<'C', 'A' | 'B' | 'C'>
// 对于Permutation<'A', 'A' | 'B' | 'C'> 来说，排除掉对自身的组合，可形成 'A', 'B'，'A', 'C' 组合，之后只要再递归一次，再拼一次，把已有的排除掉，就形
// 成了A的全排列，以此类推，形成所有字母的全排列。
// 使用Exclude<T, P>实现排除自身的效果，该函数遇到T在联合类型P中时，会返回 never，否则返回T。
// 并且当每次递归时用 Exclude<U, T> 留下没用过的组合，最后一次组合用完一定会剩下 never，此时会终止递归，表示递归结束。
// 另外在限制入参never时如果使用的是[T] extends never最后面输出的结果为never，原因是TS在做T extends never 时，会对联合类型进行分配，此时有一个特例，即
// 当T = never时，会跳过分配直接返回T本身，所以三元判断代码实际上没有执行。使用[T] extends [never]这种写法可以避免TS对联合类型进行分配，继而绕过问题。
