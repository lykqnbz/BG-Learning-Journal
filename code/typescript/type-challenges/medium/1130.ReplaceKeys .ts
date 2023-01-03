/**
  实现 ReplaceKeys<Obj, Keys, Targets> 将 Obj 中每个对象的 Keys Key 类型转化为符合 Targets 对象对应 Key 描述的类型，如果无法匹配到 Targets 则类型置为 never：

  示例：

  type NodeA = {
    type: 'A'
    name: string
    flag: number
  }

  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }

  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }


  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}>
  // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} 
  // 将名字从字符串替换为数字，将标志从数字替换为字符串。

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> 
  // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} 
  //将会把名字替换成never

 */
/* _____________ 你的代码 _____________ */

type ReplaceKeys<Obj, Keys, Targets> = {
  [K in keyof Obj]: K extends Keys ? (
    K extends keyof Targets ? Targets[K] : never
  ) : Obj[K]
}


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

/* _____________ 理解备注 _____________ */
// 题目略长，大致思路是：用 K in keyof Obj 遍历原始对象所有 Key，如果这个 Key 在描述的 Keys 中，且又在 Targets 中存在，则
// 返回类型 Targets[K] 否则返回 never，如果不在描述的 Keys 中则用在对象里本来的类型。
