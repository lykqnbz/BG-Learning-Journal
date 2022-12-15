let result: unknown;
// 缩小类型 
if (typeof result == 'number') {
  result.toFixed();
}

let undeclared: undefined = undefined;
let unusable: void = undefined;

unusable = undeclared;
// undeclared = unusable;  //ts(2322

const userInfo: {
  id?: number,
  name: null | string
} = { id: 1, name: 'Jane' }
if (userInfo.id !== undefined) {
  userInfo.id.toFixed()
}
userInfo.id!.toFixed()  //不建议
userInfo.name!.toLowerCase()  //不建议，无法排除ul,udf
userInfo.id?.toFixed()
const myName = userInfo.name ?? `my name is none`

// 常量断言
let str = 'str' as const
const readOnlyArr = [0, 1] as const
// 非空断言
let mayNullOrUnderfinedOrString: null | undefined | string;
mayNullOrUnderfinedOrString!.toString()
// mayNullOrUnderfinedOrString.toString()  //ts2531 
type Direction = 'up' | 'down';
function move(dir: Direction) { };
move('up');
// move('right');   //ts2345  字面量类型组合的联合类型
interface Config {
  size: 'small' | 'big';
  inEnable: true | false;
  margin: 0 | 2 | 4
}
function say(this: Window, name: string) {
  console.log(this.name)
}
window.say = say
say('GOOD MAN')

class Component {
  onClick(this: Component) { }
}
const component = new Component()
interface UI {
  addClickListener(onClick: (this: void) => void): void;
}
const ui: UI = {
  addClickListener() { }
}
// ui.addClickListener(new Component().onClick)   //ts2345 void和Component对于this定义不匹配

class Container {
  private val: number;
  constructor(val: number) {
    this.val = val
  }
  map(cb: (x: number) => number): this {
    this.val = cb(this.val);
    return this
  }
  log(): this {
    console.log(this.val)
    return this
  }
}
const instance = new Container(1).map((x) => x + 1).log().map((x) => x * 3).log()   //2 6

// 类型谓语is实现自定义类型守卫
function isString(s: any): s is string {
  return typeof s === 'string'
}
function isNumber(n: number) {
  return typeof n === 'number'
}
function operator(x: unknown) {
  if (isString(x)) { }
  // if (isNumber(x)) { }  //ts2345 
}

class Animal {
  weight: number;
  type = 'Animal'
  constructor(weight: number) {
    this.weight = weight
  }
}
class Dog extends Animal {
  name: string;
  constructor(name: string) {
    super(2)
    this.name = name
  }
  bark() {
    console.log('旺旺')
  }
}
const dog = new Dog('Q')
dog.bark()

// 使用抽象类派定义派生类需要实现的属性和方法，同事可以定义其他被集成的默认属性和方法
// 抽象类不能被实例化，并且派生类必须实现集成自抽象类的抽象属性和方法定义。
abstract class Adder {
  abstract x: number;
  abstract y: number;
  abstract add(): number;
  displayName = 'Adder';

  addTwice(): number {
    return (this.x + this.y) * 2
  }
}
class NumAdder extends Adder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super()
    this.x = x;
    this.y = y
  }
  add(): number {
    return this.x + this.y
  }
}

interface IAdder {
  x: number;
  y: number;
  add: () => number;
}
class NumAdder1 implements IAdder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y
  }
  add(): number {
    return this.x + this.y
  }
}

// 索引签名约束未知对象中的参数
interface ProgramLanguage1 {
  [key: string]: number | string | boolean
}
let TypeScript1: ProgramLanguage1 = {
  name: 'Jane',
  age: 22,
  isGoodMan: false
};
interface ProgramLanguage2 {
  [key: number]: string
}
let TypeScript2: ProgramLanguage2 = ['1', '2', '3']