
export { }
interface BgParms_Inter {
  height?: number;
  width?: number;
  radius?: number;
  isShapObj: boolean;
}

function isBgObj(obj: any): obj is BgParms_Inter {
  return Boolean(obj && obj.isShapObj === true)
}

class Square {

  public height: number;
  public width: number;

  constructor(width?: number, height?: number)
  constructor(bgAreaParms?: BgParms_Inter)
  constructor(value_?: any, value2_?: number
  ) {

    if (isBgObj(value_)) {
      this.height = value_.height || 0
      this.width = value_.width || 0
    } else {
      this.width = value_ || 0;
      this.height = value2_ || 0
    }
  }
  getArea() {
    return this.width * this.height
  }
  //  下面这个错误
  //  constructor() 此重载签名与其实现签名不兼容 
  //  重载签名中有一个必选参数bgAreaParms
  //  那么当外部使用constructor()来创建实例时
  //  因为bgAreaParms既然是必选参数变量 这个变量就不可能为undefined
  //  那么constructor()时表达的是bgAreaParms参数为undefined
  //  相互不兼容 

  // constructor(bgAreaParms?: BgParms_Inter)
  // constructor(bgAreaParms: BgParms_Inter, width?: number, height?: number) {//bgAreaParms: BgParms_Inter | undefined
  // if (typeof bgAreaParms !== "undefined") {
  //   if (bgAreaParms) {
  //     this.height = bgAreaParms.height || 0
  //     this.width = bgAreaParms.width || 0
  //   } else {
  //     this.width = width || 0;
  //     this.height = height || 0
  //   }
  // }
}

let bgParms_Inter: BgParms_Inter =
  { width: 30, height: 50, isShapObj: true }
let square1 = new Square(bgParms_Inter);
console.log(square1);
let square2 = new Square(9, 5);
console.log(square2.getArea());

