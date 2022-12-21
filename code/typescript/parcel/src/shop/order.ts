import OrderDetail from './orderDetail'
class Order {
  // public orderId: number;
  // public date: Date
  // public custname: string
  // public phone: string
  // 定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
  // public orderDetailArray: Array<OrderDetail> = []
  // 给构造器的参数如果加上public,这个参数就变成了一个属性,
  //   第一步：定义了一个属性，
  //   第二步：等于默认构造函数会给这个属性赋值[隐式操作]
  constructor(public orderId: number, public date: Date,
    public custname: string,
    public phone: string, public orderDetailArray: Array<OrderDetail>) {
    return this;
    // this.orderId = orderId_;
    // this.date = date_;
    // this.custname = custname_;
    // this.phone = phone_
    // this.orderDetailArray = orderDetailArray_
  }
  doEat() {
    //let x = undefined;
    const x = 3;
    // @ts-ignore
    x = 10;//无法分配到 "x" ，因为它是常数。
  }

}

class SonOrder extends Order {
  doStep() {
    super.doEat
  }
}

let orderDetailOne = new OrderDetail(10, "TV", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "DESK", 2000, 2);
var orderDate = new Date(2023, 10, 17, 5, 20, 0);
let order = new Order(1, orderDate, "Jane", "33333",
  [orderDetailOne, orderDetailTwo]);

console.log(order);


