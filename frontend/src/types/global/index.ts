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
  likes: any[]
  bookmarks: any[]
}

export interface TweetsType {
  id: number
  authorAvatar: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  img: string
  likes?: TweetLikeType[]
}

export interface TweetLikeType {
  id: number
  tweetId: number
  authorId: string
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

export interface followType {
  authorId: string
  username: string
  icon: string
}

export interface BoardRoomType {
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
}
