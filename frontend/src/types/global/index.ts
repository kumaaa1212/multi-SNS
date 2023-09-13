export interface ChidrenProps {
  children: React.ReactNode
}
// album
export interface ArticleProps {
  posts: ArticlesType[]
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
  likes: ArticlesLikeType[]
  bookmarks: ArticlesBookmarksType[]
}

export interface ArticlesLikeType {
  id: number
  postId: string
  authorId: string
}

export interface ArticlesBookmarksType {
  id: number
  postId: string
  authorId: string
}
export interface LabelType {
  id: number
  label: string
  img: string
  league: string
  name: string
  postId: number
}

// tweet
export interface TweetsType {
  id: number
  authorAvatar: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  img: string
  likes?: TweetLikeType[] | []
}

export interface TweetLikeType {
  id: number
  tweetId: number
  authorId: string
}
// chat
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

export interface MessageType {
  id: string
  content: string
  createdAt: string
  authorId: string
  authorAvatar: string
  authorName: string
  senderId: string
  roomId: string
}

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

// team
export interface TeamDataType {
  label: string
  name: string
  league: string
  img: string
  stadium: string
}

// user
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
// followUser, followerUser
export interface FrendInfo {
  userId: string
  bio: string
  name: string
  icon: string
  team: string
  twitterURL: string
  teamURL: string
}
