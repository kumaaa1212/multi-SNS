export interface BoardRoomType {
  id: string
  board: BoardType[]
  createdAt: string
  roomId: string
  team: string
}

export interface BoardType {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
  likes: BoradLikeType[]
  messages: BoardMessageType[]
  createdAt: string
  roomId: string
}

export interface BoradLikeType {
  id: string
  postId: string
  authorId: string
}

export interface BoardMessageType {
  id: number
  content: string
  createdAt: string
  authorId: string
  authorName: string
  authorAvatar: string
  boardId: string
}
