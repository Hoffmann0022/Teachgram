export interface Post {
  id: number
  title: string
  photoLink: string
  likes: number
  isPrivate: boolean
  createdAt: string
}

export interface PostForm {
  title: string
  description: string
  photoLink: string
  videoLink: string
  isPrivate: boolean
}