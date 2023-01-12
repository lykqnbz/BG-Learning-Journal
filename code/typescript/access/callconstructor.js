function Parent(name, age) {
  this.name = name
  this.age = age
  console.log("this:", this)
  console.log("this.name:", this.name)
}
Parent.prototype.friends = ["Tom", "Jane"]
Parent.prototype.eat = function () {
  console.log(this.name + " eat");
}
function Son(name, age, favor, sex) {
  this.favor = favor
  this.sex = sex
  this.name = "noname"
  Parent.call(this, name, age)// TS继承中使用super
}
// function Son2 (name, age, address, sex) {
//   this.address = address 
//   this.sex = sex
//   Parent.call(this, name, age)// TS继承中使用super
// }

let sonobj2 = new Son("lisa", 34, "swimming", "man");
console.log("sonobj2:", sonobj2)
console.log("sonobj2.friends:", sonobj2.friends);//undefined


