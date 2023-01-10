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

}
LocalStorage.getInstance()

