// infer
// 官方内置 ReturnType
type _ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// 如果泛型变量T是 () => infer R的`子集`，那么返回 通过infer获取到的函数返回值，否则返回boolean类型
type Func<T> = T extends () => infer R ? R : boolean;
let func1: Func<number>; // => boolean
let func2: Func<''>; // => boolean
let func3: Func<() => Promise<number>>; // => Promise<number>

// 同上，但当a、b为不同类型的时候，返回不同类型的联合类型
type Obj<T> = T extends { a: infer VType, b: infer VType } ? VType : number;
let obj1: Obj<string>; // => number
let obj2: Obj<true>; // => number
let obj3: Obj<{ a: number, b: number }>; // => number
let obj4: Obj<{ a: number, b: () => void }>; // => number | () => void

// 在 Promise 输入了 number 获得一个新的类型，那么 infer 就可以通过已知的类型和获得它泛型反推出泛型参数
type numberPromise = Promise<number>;
type n = numberPromise extends Promise<infer P> ? P : never; // number

type ReturnType1<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
// (...args: any) => infer R 不是泛型，为什么还能用 infer 呢？ 可以改写一下
type F<T> = (...args: any) => T
type ReturnType2<T extends (...args: any) => any> = T extends F<infer R> ? R : any;


// 获取参数类型
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never;
// 获取实例类型
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
class TestClass {
  constructor(
    public name: string,
    public string: number
  ) { }
}
type Params = ConstructorParameters<typeof TestClass>;  // [string, numbder]
type Instance = InstanceType<typeof TestClass>;         // TestClass

// union 转 intersection，如：string | number -> string & number
// 在条件类型 T extends U ? X : Y 中，当 T 是 A | B 时，会拆分成 A extends U ? X : Y | B extends U ? X : Y,再利用在逆变位置上，同一类型变量的多个候选类型将会被推断为交叉类型的特性，即
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type Result = UnionToIntersection<string | number>; // string & number


// ---* React中的useReducer 示例 *----
// @ts-ignore
function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  // ReducerState 推断类型
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
  // @ts-ignore
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

// infer推断
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;
// Reducer类型
type Reducer<S, A> = (prevState: S, action: A) => S;
const reducer = (x: number) => x + 1;
// @ts-ignore
const [state, dispatch] = useReducer(reducer, '');

// ---* React中的useReducer 示例 *----

// ---* Vue3中的UnwrapRef 示例 *----
// 如果泛型变量T是ComputedRef的x子集，那么使用UnwrapRefSimple处理infer指代的ComputedRef泛型参数V
// 否则进一步判断是否为Ref的子集，进一步UnwrapRefSimple
export type UnwrapRef<T> = T extends ComputedRef<infer V> ? UnwrapRefSimple<V> : T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>

// 如果T为Function | CollectionTypes | BaseTypes | Ref之一的子集，直接返回。
// 否则判断是否为数组的子集，不是的话视为object，调用UnwrappedObject
// @ts-ignore
type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref ? T : T extends Array<any> ? T : T extends object ? UnwrappedObject<T> : T

// 调用UnwrapRef，产生递归效果，解决了ts类型递归
// @ts-ignore
type UnwrappedObject<T> = { [P in keyof T]: UnwrapRef<T[P]> } & SymbolExtract<T>

// 泛型Ref
export interface Ref<T = any> {
  // @ts-ignore
  [Symbol()]: true,
  value: T
}

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
}

export interface WritableComputedRef<T> extends Ref<T> {
  // @ts-ignore
  readonly effect: ReactiveEffect<T>
}
// ---* Vue3中的UnwrapRef 示例 *----
// 正常应用例子
type Shift<T> = T extends [infer L, ...infer R] ? [...R] : [];
type Pop<T extends any[]> = T extends [...infer L, infer R] ? [...L] : [];
type Reverse<T extends unknown[], U extends unknown[] = []> = [] extends T ? U : T extends [infer L, ...infer R] ? Reverse<R, [L, ...U]> : U;
type FlipArguments<T extends Function> = T extends (...arg: infer R) => infer S ? (...arg: Reverse<[...R]>) => S : T;
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}` ? true : false;
type TrimLeft<S extends string> = S extends `${infer L}${infer R}` ? L extends ' ' | '\n' | '\t' ? TrimLeft<R> : S : '';
type Trim<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}` ? Trim<R> : S extends `${infer L}${' ' | '\t' | '\n'}` ? Trim<L> : S;
type StringToUnion<T extends string, U = never> = T extends '' ? U : T extends `${infer L}${infer R}` ? StringToUnion<R, U | L> : U;
