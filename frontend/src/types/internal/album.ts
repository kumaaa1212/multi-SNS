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

export interface KeepAlbum {
  title: string
  content: string
  authorId: string
  createdAt: string
  id: number
}
