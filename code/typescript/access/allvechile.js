"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
exports.__esModule = true;
// 父类：Vechile   交通工具。
var Vechile = /** @class */ (function () {
  function Vechile(brand_, vechileNo_, days_, deposit_) {
    this.total = 0;
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    this.deposit = deposit_;
    console.log("constructor Vechile=>this.brand:", this.brand);
  }
  // 计算租赁的价格 ( calculateRent)
  Vechile.prototype.calculateRent = function () {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand);
    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  };
  //支付押金的方法( payDesposit)
  Vechile.prototype.payDesposit = function () {
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
  };
  //  安全检测方法（safeShow)
  Vechile.prototype.safeShow = function () {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  };
  Vechile.count = 3;
  return Vechile;
}());
// 子类Car类 独有属性为type_ 
var Car = /** @class */ (function (_super) {
  __extends(Car, _super);
  function Car(brand_, vechileNo_, days_, deposit_, type_) {
    var _this =
      //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
      _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
    _this.type = type_;
    return _this;
  }
  // 根据型号来获取租用一天该型号的租金
  Car.prototype.getPriceByType = function () {
    var rentMoneyByDay = 0;
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    }
    else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    }
    else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  };
  // private 是私有的访问修饰符 只允许在本类中方法
  // protected 是受保护的访问修饰符【修饰符是用来控制方法或属性访问的范围】
  // 可以被本类和子类中使用，不能在类的外部使用
  // public 可以被本类和子类中使用，也可以在类的外部使用 默认是public
  Car.prototype.calculateRent = function () {
    // this.safeShow();// 寄生组合继承模式 middle()
    _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count);
    console.log("this.brand:", this.brand);
    return this.days * this.getPriceByType();
  };
  Car.prototype.checkIsWeigui = function (isOverWeight) {
    if (isOverWeight) {
      this.total = this.total + 500;
    }
  };
  return Car;
}(Vechile));
var car = new Car("普拉多", "厦3A556", 3, 100000, "凯美瑞旗舰版");
console.log(car.calculateRent());
var Bus = /** @class */ (function (_super) {
  __extends(Bus, _super);
  function Bus(brand_, vechileNo_, days_, deposit_, seatNum_) {
    var _this =
      //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
      _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
    _this.seatNum = seatNum_;
    if (_this.seatNum > 200) {
      throw new Error("座位数不能超过200");
    }
    return _this;
  }
  //计算租赁价格
  Bus.prototype.getPriceBySeatNum = function () {
    var rentMoneyByDay = 0;
    if (this.seatNum <= 16) {
      rentMoneyByDay = 800;
    }
    else if (this.seatNum > 16) {
      rentMoneyByDay = 1600;
    }
    return rentMoneyByDay;
  };
  Bus.prototype.calculateRent = function () {
    _super.prototype.calculateRent.call(this);
    return this.days * this.getPriceBySeatNum();
  };
  Bus.prototype.checkIsOverNum = function (isOverWeight) {
    if (isOverWeight) {
      this.total = this.total + 2000;
    }
  };
  return Bus;
}(Vechile));
var Truck = /** @class */ (function (_super) {
  __extends(Truck, _super);
  function Truck(brand_, type_, days_, deposit_, ton_) {
    var _this = _super.call(this, brand_, type_, days_, deposit_) || this;
    _this.ton = ton_;
    if (_this.ton < 300 || _this.ton > 2000) {
      throw new Error("吨数在300-2000吨之间");
    }
    return _this;
  }
  Truck.prototype.checkIsOverWeight = function (isOverWeight) {
    if (isOverWeight) {
      console.log("超载了");
      this.total = this.total + 2000;
    }
  };
  //计算租赁价格
  Truck.prototype.CalRentPrice = function () {
    var rentMoneyByDay = 0;
    if (this.ton <= 500) {
      rentMoneyByDay = 750;
    }
    else if (this.ton > 500) {
      rentMoneyByDay = 1350;
    }
    return rentMoneyByDay;
  };
  Truck.prototype.calRent = function () {
    return this.CalRentPrice() * this.days;
  };
  Truck.prototype.calDesposit = function () {
    return this.deposit;
  };
  return Truck;
}(Vechile));
var Customer = /** @class */ (function () {
  function Customer() {
  }
  Customer.prototype.rentVechile = function () {
  };
  return Customer;
}());
