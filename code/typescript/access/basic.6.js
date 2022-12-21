function UserA(_No, _Age) {
  this.No = _No;
  this.Age = _Age;
  //引用对象类型=引用类型=对象类型=引用数据类型 
  // 数组也是一种引用数据类型 
  this.commonfriends = ["Jimi", "Dav", "Echo", "Master"]
  // 方法也是一种引用数据类型 
  this.show = function () {
    console.log(`No:${this.No},Age:${this.Age}`)
    console.log(`mutual friends:${this.commonfriends}`)
  }
}
// 对象也叫实例
// Jane叫做对象变量 对象是等号右边通过new出来的一个实例 而且是运行期间才在堆中开辟对象的内存空间
let JaneaA = new UserA("JaneaA", 15)
JaneaA.show()

//方法栈--执行方法时的栈区
function UsersB(_No, _Age) {
  this.No = _No;
  this.Age = _Age;
}
UsersB.prototype.commonfriends = ["Jimi", "Dav", "Echo", "Master"]
UsersB.prototype.show = function () {
  console.log(`No:${this.No},Age:${this.Age}`)
  console.log(`mutual friends:${this.commonfriends}`)
}
let JaneaB = new UsersB("JaneaB", 16)
JaneaB.show()
console.log(`commonfriends:${JaneaB.commonfriends}`)
console.log("prototype:", UsersB.prototype);
