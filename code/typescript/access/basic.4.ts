// 类型兼容 逆变、协变、双向协变、不变 
interface i1 {
  name: string
}
interface i2 {
  id: number,
  name: string
}
class C2 {
  id = 1;
  name = '1'
}
let O1: i1
let O2: i2
let instC2: C2
O1 = O2;
O1 = instC2;

let On1 = {
  id: 2,
  name: 'name'
}
let On2 = {
  id: 2,
  name: 'name'
}
On1 = On2
On1 = {
  id: 2,
  name: 'name'
} as i2

interface m1 {
  name: number
}
interface m2 extends m1 {
  name: string;
}
interface n1<T> {
  id: number
}
let no1: n1<string>
let no2: n1<number>
no1 = no2
let fun1 = <T>(p1: T): 1 => 1;
let fun2 = <T>(p2: T): number => 2;
fun2 = fun1

type isChild<Child, Par> = Child extends Par ? true : false;
interface Animal {
  name: string
}
interface Dog extends Animal {
  woof: () => void;
}
type Covariance<T> = T
type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>>
type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }>
type inArryElementCovariant = isChild<Dog[], Animal[]>
type isReutrnTypeCovariant = isChild<() => Dog, () => Animal>

// decalre 
declare var val1: string;
declare let val2: number;
declare const val3: boolean;

val1 = '1';
val2 = 2;
// val3 = true

declare function toString(x: number): string;
const x = toString(1)

declare class Person1 {
  public name: string;
  private age: number;
  constructor(name: string);
  getAge(): number
}
const person = new Person1('Jane')
person.name;
// person.age;
person.getAge()

declare module 'lodash' {
  export function first<T extends unknown>(array: T[]): T
}

declare module '*.jpg' {
  const src: string;
  export default src
}
declare module '*.png' {
  const src: string;
  export default src
}

declare namespace $ {
  const version: number;
  function ajax(settings?: any): void;
}
$.version;
$.ajax()

// .d.ts
// Definitely Typed

import { Person } from "./person";
declare module './person' {
  interface Person {
    greet: () => void
  }
}
Person.prototype.greet = () => {
  console.log('this is prototype')
}

declare global {
  interface Array<T extends unknown> {
    getLen(): number
  }
}
Array.prototype.getLen = function () {
  return this.length
}
// Partial
type Partial<T> = {
  [P in keyof T]?: T[P]
}
interface Personnn {
  name: string,
  age?: number,
  weight?: number
}
type PartialPerson1 = Partial<Personnn>;
// ==
interface PartialPerson2 {
  name?: string,
  age?: number,
  weight?: number
}
// Required
type Required<T> = {
  [P in keyof T]-?: T[P]
}
type RequiredPerson1 = Required<Personnn>;
// ==
interface RequiredPerson2 {
  name: string,
  age: number,
  weight: number
}
// Readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
type ReadonlyPerson1 = Readonly<Personnn>;
// ==
interface ReadonlyPerson2 {
  readonly name: string,
  readonly age?: number,
  readonly weight?: number
}
// Pick
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type NewPerson1 = Pick<Person, 'name' | 'age'>
// ==
interface NewPerson2 {
  name: string,
  age?: number
}
// Exclude
type Exclude<T, U> = T extends U ? never : T;
type T1 = Exclude<'a' | 'b' | 'c', 'a'>// =>'b'|'c'
type NewPersonn1 = Omit<Person1, 'weight'>
// ==
type NewPersonn2 = Pick<Person1, Exclude<keyof Person1, 'weight'>>
// 其中
type ExcludeKeys = Exclude<keyof Person1, 'weight'>  //=>'name'|'age'
// Extract 
type Extract<T, U> = T extends U ? T : never;
type T2 = Extract<'a' | 'b' | 'c', 'a'> // =>'a'
// NonNullable 
type NonNullable<T> = T extends null | undefined ? never : T
// 等同于使用了Exclude
type asNonNullable1<T> = Extract<T, null | undefined>
type asNonNullable2 = NonNullable<string | number | undefined | null>  //=>string|number
// Record
type Record<K extends keyof any, T> = {
  [P in K]: T
}
type MenuKey = 'home' | 'about' | 'more'
interface Menu {
  label: string;
  hidden?: boolean
}
const menus: Record<MenuKey, Menu> = {
  about: { label: '关于' },
  home: { label: '主页' },
  more: { label: '更多', hidden: true },
}
type T3 = keyof any //=>sting |number |symbol
// Parameters 获取函数的参数并返回序对
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type Tn0 = Parameters<() => void>
type Tn1 = Parameters<(x: number, y?: string) => void>  //[x:number,y?:string]
// ReturnType 获取函数的返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type Tk0 = ReturnType<() => void> //=>void
type Tk1 = ReturnType<() => string> //=>string
// ThisParameterType 获取函数的this参数类型
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
type Tk2 = ThisParameterType<(this: Number, x: number) => void> //Number
// ThisType 获取在对象字面量中指定this的类型 相当于任意空接口
interface ThisType<T> { }
// 4.1支持模字符串
type Uppercase<S extends string> = intrinsic  //转换字符串字面量到大写字母
type Lowercase<S extends string> = intrinsic  //转换字符串字面量到小写字母
type Capitalize<S extends string> = intrinsic  //转换字符串字面量的第一个字母为大写字母
type Uncapitalize<S extends string> = intrinsic  //转换字符串字面量的第一个字母为小写字母
type Tm1 = Uppercase<'Hello'> //=>'HELLO
type Tm2 = Lowercase<Tm1> //=>'hello'
type Tm3 = Capitalize<Tm2> //=>'Hello'
type Tm4 = Uncapitalize<Tm3> //=>'hello'

interface MixedObject {
  animal: {
    type: 'animal' | 'dog' | 'cat';
    age: number
  };
  [x: number]: {
    type: string;
    age: number;
    nickname: string
  };
  [x: string]: {
    type: string;
    age: number
  }
}
type animal = MixedObject['animal'];
type animalType = MixedObject['animal']['type']
type numberIndex = MixedObject[number]
type numberIndex0 = MixedObject[0]
type stringIndex = MixedObject[string]
type stringIndex0 = MixedObject['string']

type MixedObjectKeys = keyof MixedObject  //string|number
type animalKeys = keyof animal //'type'|'age'
type numberIndexKeys = keyof numberIndex  //'type'|'age'|'nickname'

// typeof 用于获取类型上下文中变拉和属性的类型
let StrA = 'a'
const unions = typeof StrA  // const静态类型和上下文无关所以unions类型是 'string'|'number'|'bigint'|'booleab'|'symbol'|'function'|'undefined'|'object'|
const str: typeof StrA = 'string'  //string
type DerivedromStrA = typeof StrA  //string

// 映射类型
type SpecifiedKeys = 'id' | 'name';
type TargetType1 = {
  [key in SpecifiedKeys]: any;
}//{id:any,name:any}
type TargetGeneric<O extends string | number | symbol> = {
  [key in O]: any
}
type TargetInstance1 = TargetGeneric<SpecifiedKeys> //{id:any,name:any}

interface Sourcelnterface {
  readonly id: number;
  name?: string;
}
type TargetType2 = {
  [key in keyof Sourcelnterface]: Sourcelnterface[key];
}//{ readonly id: number;name?:string|undefined}
type TargetGenericType<S> = {
  [key in keyof S]: S[key];
};
type TargetInstance2 = TargetGenericType<Sourcelnterface>;// { readonly id: number; name ?: string | undefined }

type TargetGenericTypeAssertiony<S> = {
  [key in keyof S as Exclude<key, 'id'>]: S[key]
}
type TargetGenericTypeAssertionyInstance = TargetGenericTypeAssertiony<Sourcelnterface>  //{name?:string|underfined} 

// Exclude ReturnTypeOfResolved Merge Equal
// Exclude
type Am1 = Exclude<1 | 2, 1>  //2
type Am2 = Exclude<'id' | 'name', 'id'>  //'name'
type Am3 = Exclude<boolean, true>  //false
type IExclude<T, U> = T extends U ? never : T
// ReturnTypeOfResolved
// ...
// Merge
type Merge<A, B> = {
  [key in keyof A | keyof B]: key extends keyof A ? key extends keyof B ? A[key] | B[key] : A[key] : key extends keyof B ? B[key] : never
}
type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>  // name: string; age: number; id: string | number;
// Equal  
// ...