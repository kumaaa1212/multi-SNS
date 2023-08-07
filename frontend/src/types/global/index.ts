export interface ChidrenProps {
  children: React.ReactNode
}

export interface Room {
  id: string
  user1Id: string
  user1Name: string
  user1Icon: string
  user2Id: string
  user2Icon: string
  user2Name: string
  createdAt: string
  messages: any[]
}

export interface Message {
  id: string
  content: string
  createdAt: string
  authorId: string
  senderId: string
  roomId: string
}
