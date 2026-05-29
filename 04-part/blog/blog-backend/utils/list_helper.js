
/* =============================
   dummy
=============================== */
const dummy = (blogs) => {
  return 1
}
 
/* =============================
    totalLikes
=============================== */
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
 
/* =============================
    favoriteBlog
=============================== */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
 
  const favorite = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
 
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}
 
/* =============================
   mostBlogs
=============================== */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
 
  // Count blogs per author
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})
 
  // Find the author with the most blogs
  const topAuthor = Object.keys(counts).reduce((max, author) =>
    counts[author] > counts[max] ? author : max
  )
 
  return {
    author: topAuthor,
    blogs: counts[topAuthor]
  }
}
 
/* =============================
   mostLikes
=============================== */
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
 
  // Sum likes per author
  const likesPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})
 
  // Find the author with the most likes
  const topAuthor = Object.keys(likesPerAuthor).reduce((max, author) =>
    likesPerAuthor[author] > likesPerAuthor[max] ? author : max
  )
 
  return {
    author: topAuthor,
    likes: likesPerAuthor[topAuthor]
  }
}
 
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}