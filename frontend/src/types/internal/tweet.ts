export interface TweetsType {
  id: number
  authorAvatar: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  img: string
  likes?: TweetLikeType[] | []
  label: string
}

export interface TweetLikeType {
  id: number
  tweetId: number
  authorId: string
}
