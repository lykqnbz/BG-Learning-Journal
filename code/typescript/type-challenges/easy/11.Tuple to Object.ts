/**
  传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

  例如：

  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

*/

/* _____________ 你的代码 _____________ */

// type TupleToObject<T extends readonly any[]> = { [P in T[number]]: P }
type TupleToObject<T extends readonly (string | number | symbol)[]> = { [P in T[number]]: P }


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


/* _____________ 理解备注 _____________ */
// 通过number索引，也就是T[number]获取到每一项
// 最开始的疑问是为什么要T extends readonly any[]。后来查询后了解到这是因为要传入的是一个任意类型的数组，而T[]这种事不合法的，所以需要使用extends去构造一个新的类型
// 但是any[]在下面的error又会有报错，意思其实就是转换的时候，如果遇到数组中的值不能做对象的键，期望报错。网上查询后把any[]改成符合作为元祖属性条件的类型进去，因为对象的键只能是string number symbol)，any[]改成(string|number|symbol)[]就可以了。
