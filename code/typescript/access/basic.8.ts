class ArrayList {
  constructor(public element: Array<object>) {

  }
  get(index: number) {
    return this.element[index]
  }

  show() {
    this.element.forEach(ele => {
      console.log(ele)
    })
  }

  remove(value: number): number
  remove(value: object): object
  remove(value: number | object): number | object {
    this.element = this.element.filter((ele, index) => {
      if (typeof value === 'number') {
        return value !== index
      } else {
        return value !== ele
      }
    })
    return value
  }
}
let humanOne = { name: 'Jane', age: 23 }
let humanTwo = { name: 'Tom', age: 24 }
let humanThree = { name: 'Ash', age: 25 }
let array = new ArrayList([humanOne, humanTwo, humanThree])
array.remove(1)
array.show()

type type_CharParam = {
  width?: number,
  height?: number,
  radius?: number,
}
class Square {
  public width: number
  public height: number
  constructor(_width: number, _height: number)
  constructor(parmObj: type_CharParam)
  // constructor(parmObjOrWidth: number | type_CharParam) {
  constructor(parmObjOrWidth: any, _height: number = 1) {
    if (typeof parmObjOrWidth === 'object') {
      this.width = parmObjOrWidth.width
      this.height = parmObjOrWidth.height
    } else {
      this.width = parmObjOrWidth
      this.height = _height
    }
  }
  public getArea(): number {
    return this.width * this.height
  }
}
let square = new Square(40, 50)
let charParamObj: type_CharParam = { width: 50, height: 90 }
let square2 = new Square(charParamObj)

export default class LocalStorage {

  static localStorage: LocalStorage
  count!: number;
  private static total: number = 0
  private constructor() {

  }
  public static getInstance() {
    if (!this.localStorage) {
      this.localStorage = new LocalStorage()
    }
    return this.localStorage
  }
  public static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static getItem(key: string) {
    let value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  public static addTotal() {
    this.total += 1
  }
  public static getToatl() {
    return this.total
  }
  getChange(): any {
    return undefined
  }
}
// 静态方法属性通过类来调用，原型上的方法属性通过对象来调用
LocalStorage.getInstance()
// TS类能在外部使用prototype为TS类修改方法属性，无法增加方法属性  2 
// LocalStorage.prototype.getError = function () { return null }
LocalStorage.prototype.getChange = function () { return null }

let obj1 = new Object({ name: 'Jane', age: 23 })
let obj2 = { name: 'Jane', age: 23 }
// 把obj对象变更了传递给keys静态方法，obj对象变量作为keys静态方法的参数
// 但是静态方法内部不能通过this来访问对象属性方法
Object.keys(obj2)

class FileUtil {
  public static readFile(fileName: string) {
    fs.readFile(fileName, (err: any, data: any) => {
      console.log('fs.readFile:', data.toString())
    })
  }
  public static writeFile(fileName: string) {
    fs.writeFile(fileName, 'Jane', function (error: any) {
      if (error) {
        console.log('wrong')
      } else {
        console.log('success')
      }
    })
  }
}
FileUtil.readFile('./log.txt')
FileUtil.writeFile('./log.txt')

class _FileUtil {
  constructor(public fileName: string) { }
  public readFile() {
    fs.readFile(this.fileName, (err: any, data.any) => {
      console.log('fs.readFile:', data.toString())
    })
  }
  public writeFile(fileName?: string) {
    fs.writeFile(fileName, 'Jane', function (error: any) {
      if (error) {
        console.log('wrong')
      } else {
        console.log('success')
      }
    })
  }
}
new _FileUtil('./log.txt').readFile()
new _FileUtil('./log.txt').writeFile()