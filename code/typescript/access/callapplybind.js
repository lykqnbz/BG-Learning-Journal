let peopleObj = {
  name: 'Lucy',
  ppl_age: this.age,
  eat(name, age) {
    this.name = name;
    this.age = age;
    console.log("this:", this);
    console.log(this.name + " Age:"
      + this.age + " and" + this.who + " with" + this.address + "eat")
    return 3;
  }
}

function chinesePeople(name_, age_, address, who) {
  this.address = address;
  this.who = who;
}

let chinseobj = new chinesePeople("Jane", 23, "bejing", "ok")


let myobj = {
  username: 'Tom',
  age: 98
}

