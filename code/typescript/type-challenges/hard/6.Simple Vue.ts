/**
  实现类似Vue的类型支持的简化版本。

  通过提供一个函数SimpleVue（类似于Vue.extend或defineComponent），它应该正确地推断出 computed 和 methods 内部的this类型。

  在此挑战中，我们假设SimpleVue接受只带有data，computed和methods字段的Object作为其唯一的参数，

  data是一个简单的函数，它返回一个提供上下文this的对象，但是你无法在data中获取其他的计算属性或方法。

  computed是将this作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

  methods是函数的对象，其上下文也为this。函数中可以访问data，computed以及其他methods中的暴露的字段。 computed与methods的不同之处在于methods在上下文中按原样暴露为函数。

  SimpleVue的返回值类型可以是任意的。

  const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})

 */
/* _____________ 你的代码 _____________ */

type getComputed<T> = {
  [P in keyof T]: T[P] extends () => unknown ? ReturnType<T[P]> : never
}
type getThis<data, computed, methods> = ThisType<data & getComputed<computed> & methods>

type Options<data, computed, methods> = {
  data: (this: void) => data,
  computed: computed & getThis<data, computed, methods>,
  methods: methods & getThis<data, computed, methods>
}

declare function SimpleVue<data, computed, methods>(options: Options<data, computed, methods>): any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


/* _____________ 理解备注 _____________ */
// 说实话，medium题目里都是单体type，hard一上来就时一道完整题目，都不知道怎么下手，只能先赏析一下老大的
// 解题过程了。
// 理解了一下其实还是类似于单体type，只是多个组合再成为了一个比较完整的整体。整体思路是利用ReturnType可
// 以拿到函数返回值对象作为声明类型，举例：
// function fn() {
//   return {
//     aaa: "aaa",
//     bbb: "bbb",
//   };
// }
// let type: ReturnType<typeof fn>;
// console.log(type.aaa);
// console.log(type.bbb);
// ThisType内置函数的作用是在对象字面量中键入this，并提供通过上下文类型控制this类型的便捷方式，一些规则:
// 如果方法显示指定了 this 参数，那么 this 具有该参数的类型，举例：
// let bar = {
//   x: 'hello',
//   f(this: { message: string }) {
//     this; // { message: string }
//   }
// };
// 如果方法由带 this 参数的签名进行上下文键入，那么 this 具有该参数的类型，举例：
// let foo = {
//   x: 'hello',
//   f(n: number) {
//     this; // { x: string, f(n: number): void }
//   }
// };
// 这里运用到的ThisType就是bar的特性，返回data,computed和methods里的this。
// 这种大型类型定义中，结构化地将类型拆开、组织起来，需要被推导的点位设置为泛型参数，这也是学习到的一个重要点。

