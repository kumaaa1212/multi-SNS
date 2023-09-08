export interface ChidrenProps {
  children: React.ReactNode
}

export interface MessageType {
  id: string
  content: string
  createdAt: string
  authorId: string
  authorName: string
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

export interface BoardType {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
  likes: LikeType[]
  messages: MessageType[]
  createdAt: string
  roomId: string
}

export interface LikeType {
  id: string
  postId: string
  authorId: string
}

export interface BoardRoomType {
  board: BoardType[]
  createdAt: string
  roomId: string
  team: string
}

export interface TeamDataType {
  label: string
  name: string
  league: string
  img: string
  stadium: string
}

export interface Usertype {
  username: string
  userId: string
  team: string
  icon: string
  iconPath: string
  bio: string
  follow: FrendInfo[]
  follower: FrendInfo[]
  twitterURL?: string
  teamURL?: string
}

export interface FrendInfo {
  userId: string
  bio: string
  name: string
  icon: string
  team: string
  twitterURL: string
  teamURL: string
}
