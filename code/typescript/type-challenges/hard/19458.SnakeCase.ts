/**

创建一个SnakeCase<T>泛型，将一个用camelCase格式化的字符串变成一个用snake_case格式化的字符串。

示例：

type res1 = SnakeCase<"hello">; // => "hello"
type res2 = SnakeCase<"userName">; // => "user_name"
type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"

 */
/* _____________ 你的代码 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type SnakeCase<T, R extends string = ''> = T extends `${infer First}${infer Rest}` ?
  Equal<Lowercase<First>, First> extends true ? SnakeCase<Rest, `${R}${First}`> : SnakeCase<Rest, `${R}_${Lowercase<First>}`>
  : R

/* _____________ 测试用例 _____________ */

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]
/* _____________ 理解备注 _____________ */
// infer递归字符串，然后逐个判断Lowercase<First>, First，原始值是否和改小写后的值是
// 否一致来判断是否大小写字母，如果是则利用字符串模板_(小写)替换，持续递归，最后输出
// 储存的结果