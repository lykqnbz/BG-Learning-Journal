/**
  实现二叉树的类型版本的中序遍历

  例如：

  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const

  type A = InorderTraversal<typeof tree1> // [1, 3, 2]

 */
/* _____________ 你的代码 _____________ */

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode] ?
  [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>] : []

/* _____________ 测试用例 _____________ */

import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]
/* _____________ 理解备注 _____________ */
// 首先中序遍历会先遍历左子树，然后访问根结点，最后遍历右子树。
// 经典的JS实现版本
// function inorderTraversal(tree) {
//   if (!tree) return []
//   return [
//     ...inorderTraversal(tree.left),
//     res.push(val),
//     ...inorderTraversal(tree.right)
//   ]
// }
// 对TS来说实现递归有点不同，是通过 extends TreeNode来判定它不是 Null 从而递归。

