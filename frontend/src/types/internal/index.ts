export interface ChidrenProps {
  children: React.ReactNode
}
// album
// tweet

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
  frendId: string
}

export interface AccountType {
  email: string
  name: string
  password: string
  team: string
  icon: string
  bgIcon: string
  bio: string
  follow: []
  follower: []
  twitterURL: string
  teamURL: string
}
