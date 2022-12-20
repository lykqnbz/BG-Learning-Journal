

type JSON0 = string | number | boolean | null | JSON[] | { [key: string]: JSON };
const json1: JSON0 = 'json';
// @ts-ignore
const json2: JSON0 = { 'str', 1, true, null};
// @ts-expect-error
const json3: JSON0 = { key: 'value' };

function toString(x: number | undefined): string {
  if (x === undefined) {
    return ''
  }
  return x.toString()
}
toString()
toString(undefined)
toString(1)
new Promise<void>((resolve) => {
  resolve()
})
const symbol: unique symbol = Symbol()
interface Obj1 {
  [key: string]: any;
  [key: number]: any;
  [symbol]: any;
}
type Obj2 = {
  [key in 'id' | 'name']: any
}
// ts2589 泛型实例化递归嵌套过深,递归实例上限50层
type RepeatX<N extends number, T extends any[] = []> = T['length'] extends N ? T : RepeatX<N, [...T, 'X']>;
type T1 = RepeatX<5>
type T2 = RepeatX<50>

let x: string | undefined
if (x) {
  x.trim();
  setTimeout(() => {
    // @ts-expect-error
    x.trim() //收缩类型错误 
  });
}


type MixedObjectKeys = keyof MixedObject  //string|number
type animalKeys = keyof animal //'type'|'age'
type numberIndexKeys = keyof numberIndex  //'type'|'age'|'nickname'

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

