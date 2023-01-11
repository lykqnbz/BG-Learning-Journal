/**

实现一个类型，UnionToTuple，它可以将一个联合类型转换为一个元组。

我们知道，union是一个无序的结构，而tuple是一个有序的结构，这意味着在创建或转换union时，我们不应该预先假定一个union的各个项之间会保留任何顺序。

因此，在这个挑战中，可以接受输出元组中元素的任何排列组合。

你的类型应该解析为以下两种类型之一，但不是它们的联盟

UnionToTuple<1>           // [1], and correct
UnionToTuple<'any' | 'a'> // ['any','a'], and correct

或者

UnionToTuple<'any' | 'a'> // ['a','any'], and correct

它不应该是所有可接受元组的联合...

UnionToTuple<'any' | 'a'> // ['a','any'] | ['any','a'], which is incorrect

而一个联合类型可能会发生碰撞，这意味着一些类型可能会吸收（或被）其他类型吸收，而且没有办法防止这种吸收。请看下面的例子。

Equal<UnionToTuple<any | 'a'>,       UnionToTuple<any>>         // will always be a true
Equal<UnionToTuple<unknown | 'a'>,   UnionToTuple<unknown>>     // will always be a true
Equal<UnionToTuple<never | 'a'>,     UnionToTuple<'a'>>         // will always be a true
Equal<UnionToTuple<'a' | 'a' | 'a'>, UnionToTuple<'a'>>         // will always be a true

 */
/* _____________ 你的代码 _____________ */

type UnionToIntersectionFn<U> = (U extends unknown ? (k: () => U) => void : never) extends (k: infer I) => void ? I : never;

type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I ? I : never;

type Prepend<Tuple extends unknown[], First> = [First, ...Tuple];

type UnionToTuple<Union, T extends unknown[] = [], Last = GetUnionLast<Union>> =
  [Union] extends [never] ? T : UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]

/* _____________ 理解备注 _____________ */
// 这题有点绕，既要解决入参限制问题，还要处理边界问题和子父级，这种单个步骤多的，建议抽方法拆开来写
// 这边参考一个大佬的思路：首先因为ts 没有提供从联合类型取值的操作：
// type Union = 1 | 2;
// type A = Union[1]; // error
// 也不能直接将联合类型转为元组
// type Union = 1 | 2;
// type UnionToTuple<T> = T extends infer F | infer R ? [F, R] : never;
// type A = UnionToTuple<Union>; // [1, 1] | [2, 2];
// 就需要想其他的方法，获取联合类型某个位置的值。 将联合类型转换成函数的交叉类型，通过 infer 推断
// 类型。 在获取函数的返回值上，函数重载和函数交叉类型是一样的。实现函数交叉类型UnionToIntersectionFn，
// 作用于将联合类型转换成对应的函数交叉类型。然后实现GetUnionLast作用于获取联合类型的最后一个类型，接着
// 实现Prepend作用于把第二步中取到的值放在数组的第一项，接收两个参数 Tuple 和 First，返回一个数组，最
// 后UnionToTuple 里进行组合通过判断联合类型中有没有 never 类型，没有 never 递归调用 UnionToTupl