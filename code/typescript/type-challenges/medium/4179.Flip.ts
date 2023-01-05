/**
  实现just-flip-object的类型

  例如：

  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  
  不需要支持嵌套对象和不能成为对象键的值，如数组

 */
/* _____________ 你的代码 _____________ */


type Flip<T extends Record<string, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]: K
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]

/* _____________ 理解备注 _____________ */
// 这题要求将对象 T 中 Key 与 Value 对调，可以在 keyof 描述对象时可以通过 as 追加变形，
// 由于 Key 位置只能是 String 和 Number，所以 T[K] 描述 Key 会显示错误，要限定 Value 的类型，
// 因为case里Flip<{ pi: 3.14; bool: true }>，因为true 不能作为 Key。只能用字符串 'true' 作
// 为 Key，所以得强行把 Key 位置转化为字符串,使用模板字符串`${T[K]}`来实现

