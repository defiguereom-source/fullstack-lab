export interface Blog {
  _id: string
  title: string
  author: string
  url: string
  likes: number
}
 
export interface NewBlog {
  title: string
  author: string
  url: string
  likes: number
}
 