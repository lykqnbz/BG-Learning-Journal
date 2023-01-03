type MessageType = 'image' | 'audio' | string
type Message = {
  id: number,
  type: MessageType,
  sendMessage: string
}
let messages: Message[] = [
  // let messages: Array<Message> = [
  { id: 1, type: 'image', sendMessage: 'msg1' },
  { id: 2, type: 'audio', sendMessage: 'msg2' },
  { id: 3, type: 'audio', sendMessage: 'msg3' },
  { id: 4, type: 'image', sendMessage: 'msg4' },
  { id: 5, type: 'image', sendMessage: 'msg5' },
]

// 无重载
function getMessage(value: number | MessageType): Message | Array<Message> | undefined {
  if (typeof value === 'number') {
    return messages.find(msg => { return value === msg.id })
  } else {
    return messages.filter(msg => { return value === msg.type })
  }
}

// 有重载
export { }