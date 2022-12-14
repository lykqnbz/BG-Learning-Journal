export default class OrderDetail {

  public orderDetailId: number = 0;
  public productname: string = "noproduct"
  public price: number = 0;
  public count: number = 0;

  constructor(_orderDetailId: number, _productname: string,
    _price: number, _count: number) {

    this.orderDetailId = _orderDetailId;
    this.productname = _productname;
    this.price = _price;
    this.count = _count
    return this
  }
}
let orderDetailOne = new OrderDetail(10, "TV", 5000, 3);
