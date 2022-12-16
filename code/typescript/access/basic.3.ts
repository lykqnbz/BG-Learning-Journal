interface LanguageRankInterface {
  readonly [index: string]: string | number
}
type infa = LanguageRankInterface | string

const arr: infa = {
  age: 1,
  anyProperty: 'str'
}
type unit = 'px' | 'em' | 'rem' | '%'
function formatUnit(size: number | string, unit: unit = 'px') { }
type intersectionType = { id: number, name: string } & { age: number };
const mixed: intersectionType = {
  id: 1,
  name: 'Jane',
  age: 22
}

type BorderColor = 'black' | 'red' | 'green' | 'yellow' | string & {}
let color: BorderColor = 'green'
enum Color { black, red, green, yellow }

function uselessGenerics<P>(): P {
  return void 0 as unknown as P
}
function reflectExtraParams<P, Q>(p1: P, p2: Q): [P, Q] {
  return [p1, p2]
}
function userState<S>(state: S, initialValue?: S) {
  return [state, (s: S) => void 0] as unknown as [S, (s: S) => void]
}
class Memory<S>{
  store: S;
  constructor(store: S) {
    this.store = store
  }
  set(store: S) {
    this.store = store
  }
  get() {
    return this.store
  }
}
const numMemory = new Memory<number>(1)
const getNumMemory = numMemory.get()
numMemory.set(2)
const strMemory = new Memory('')
const getStrMemory = strMemory.get()
strMemory.set('2')

type ReflectFunction = <P>(param: P) => P;
interface IReflectFunction {
  <P>(param: P): P
}
const reflectFn1: <P>(param: P) => P = reflect
const reflectFn2: ReflectFunction = reflect
const reflectFn3: IReflectFunction = reflect

type GenericReflectFunction<P> = (param: P) => P;
interface IGenericReflectFunction<P> {
  (param: P): P
}
const reflectFn4: GenericReflectFunction<string> = reflect
const reflectFn5: IGenericReflectFunction<number> = reflect
const reflectFn4Return = reflectFn4('string')
const reflectFn5Return = reflectFn5(1)

type StringOrNumberArray<E> = E extends string | number ? E[] : E
type StringArray = StringOrNumberArray<string>   // string[]
type NumberArray = StringOrNumberArray<number>   // number
type NeverGot = StringOrNumberArray<boolean>    // boolean

interface IModel<State> {
  state: State,
  reducers: {
    [action: string]: (state: State, action: any) => State
  }
}
type ModelInterface = { id: number; name: string };
const model: IModel<ModelInterface> = {
  state: { id: 1, name: 'Jane' },
  reducers: {
    setId: (state, action: { payload: number }) => ({
      ...state,
      id: action.payload
    }),
    setName: (state, action: { payload: string }) => ({
      ...state,
      name: action.payload
    })
  }
}

// 泛型约束
function reflectSpecified<P extends number | string | boolean>(param: P): P {
  return param
}
reflectSpecified('string')
reflectSpecified(1)
reflectSpecified(true)
// reflectSpecified(null)

interface IModelSpecified<State extends { id: number; name: string }> {
  state: State
}
type ComputedModel1 = IModelSpecified<{ id: number, name: string }>
type ComputedModel2 = IModelSpecified<{ id: number, name: string, age: number }>

class sDog {
  wang = 'wangwang';
}
class sCat {
  miao = 'miaomiao'
}
const getName1 = (animal: sDog | sCat) => {
  if (animal instanceof sDog) {
    return animal.wang
  }
  if (animal instanceof sCat) {
    return animal.miao
  }
}
interface mDog {
  wang: string
}
interface mCat {
  miao: string
}
const getName2 = (animal: mDog | mCat) => {
  if ('wang' in animal) {
    return animal.wang
  }
  if ('miao' in animal) {
    return animal.miao
  }
}