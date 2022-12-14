class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return `Hi,${person.firstName}  ${person.lastName}`
}
let user = new Student('Jane', 'Les', 'Tom');
document.body.innerHTML = greeter(user)
let isDone: boolean = false;
let x: [string, number];
x = ['hello', 10];

console.log(x[0].substring(1));

enum Color { Red = 2, Green, Blue }
let c: Color = Color.Green;

let notSure: any = 4;
notSure = "string";
notSure = false;

let list: any[] = [1, true, "free"];
list[1] = 100;

function warnUser(): void {
  alert("bg");
}
let v: void = undefined;
let u: undefined = undefined;
let n: null = null;

function error(message: string): never {
  throw new Error(message);
}

let someValue1: any = "string";
let strLength1: number = (<string>someValue1).length;

let someValue2: any = "string";
let strLength2: number = (someValue2 as string).length;

let someValue3 = "string";
let strLength3: number = <number><any>someValue3


interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
// swim(tom); 报错

function getCacheData(key: string): any {
  console.log((window as any).cache[key])
  console.log(key)
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const Jane = getCacheData('Jane') as Cat;
// Jane.run();