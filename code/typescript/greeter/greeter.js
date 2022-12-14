var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = "".concat(firstName, " ").concat(middleInitial, " ").concat(lastName);
    }
    return Student;
}());
function greeter(person) {
    return "Hi,".concat(person.firstName, "  ").concat(person.lastName);
}
var user = new Student('Jane', 'Les', 'Tom');
document.body.innerHTML = greeter(user);
var isDone = false;
var x;
x = ['hello', 10];
console.log(x[0].substring(1));
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var notSure = 4;
notSure = "string";
notSure = false;
var list = [1, true, "free"];
list[1] = 100;
function warnUser() {
    alert("bg");
}
var v = undefined;
var u = undefined;
var n = null;
function error(message) {
    throw new Error(message);
}
var someValue1 = "string";
var strLength1 = someValue1.length;
var someValue2 = "string";
var strLength2 = someValue2.length;
var someValue3 = "string";
var strLength3 = someValue3;
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
function swim(animal) {
    animal.swim();
}
var tom = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
// swim(tom); 报错
function getCacheData(key) {
    console.log(window.cache[key]);
    console.log(key);
    return window.cache[key];
}
var Jane = getCacheData('Jane');
// Jane.run();
