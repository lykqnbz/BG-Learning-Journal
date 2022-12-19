export class Person {

  public name: string = "noname"
  public age: number = 0
  public phone: string = "11111"

  constructor(name_: string, age_: number, phone_: string) {
    this.name = name_;
    this.age = age_;
    this.phone = phone_;
  }
  public doEat(who: string, address: string): void {
    console.log(`${this.name}和${who}吃饭,在${address}吃饭`);
  }
  public doStep() {
  }
}
let zhangSanPerson = new Person("Tom", 23, "134123123");
zhangSanPerson.doEat("Jane", "home")
console.log(zhangSanPerson)