export interface ChidrenProps {
  children: React.ReactNode
}


export interface MessageType {
  id: string
  content: string
  createdAt: string
  authorId: string
  senderId: string
  roomId: string
}

export interface ArticlesType {
  authorAvatar: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  id: number
  labels: LabelType[]
  thumbnailImg: string
  thumbnailText: string
  title: string
}
export interface ArticleProps {
  posts: ArticlesType[]
}
export interface LabelType {
  id: number
  label: string
  img: string
  league: string
  name: string
  postId: number
}

export interface TeamType {
  name: string
  league: string
  img: string
  label: string
  stadium: string
}

export interface RoomType {
  id: string
  user1Id: string
  user1Name: string
  user1Icon: string
  user2Id: string
  user2Icon: string
  user2Name: string
  createdAt: string
  messages: MessageType[]
}
