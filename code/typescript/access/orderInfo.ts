import OrderDetail from './orderDetail'
class OrderInfo {
  public orderId: number | undefined;
  public date: Date | undefined
  public custname: string | undefined
  public phone: string | undefined
  public orderDetailArray: Array<OrderDetail> = []
  //  定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
  //  给构造器的参数如果加上public,这个参数就变成了一个属性,
  //  第一步：定义了一个属性，
  //  第二步：等于默认构造函数会给这个属性赋值[隐式操作]
  constructor(orderId: number, date: Date,
    custname: string,
    phone: string, orderDetailArray: Array<OrderDetail>) {
  }
}

let orderDetailOne = new OrderDetail(10, "TV", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "desk", 2000, 2);
var orderDate = new Date(2023, 10, 17, 5, 20, 0);
let order = new OrderInfo(1, orderDate, "Jane", "33333",
  [orderDetailOne, orderDetailTwo]);

console.log(order);



