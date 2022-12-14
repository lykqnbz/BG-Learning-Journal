import OrderDetail from './orderDetail'
class Order {
  public orderId: number = 0;
  public date: Date = new Date();
  public custname: string = "nocustname"
  public phone: string = "111"
  public orderDetailArray: Array<OrderDetail> = []
  constructor(orderId_: number, date_: Date, custname_: string,
    phone_: string, orderDetailArray_: Array<OrderDetail>) {
    this.orderId = orderId_;
    this.date = date_;
    this.custname = custname_;
    this.phone = phone_
    this.orderDetailArray = orderDetailArray_
  }

  public static peisong() {
    let time = "2024-01-02"
  }
}

let orderDetailOne = new OrderDetail(10, "TV", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "desk", 2000, 2);
let orderDetailArray: Array<OrderDetail> = [orderDetailOne, orderDetailTwo]

var orderDate = new Date(2023, 10, 17, 5, 20, 0);

let order = new Order(1, orderDate, "Jane", "33333",
  [orderDetailOne, orderDetailTwo]);

console.log(order);
