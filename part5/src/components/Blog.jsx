import { useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, setStatusMessage, user, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogToggleRef = useRef()

  const handleLike = async () => {
    try {
      let newBlog = blog
      newBlog.likes++
      await blogService.update(newBlog)
      setStatusMessage({ status: 'success', message: 'Blog post liked' })
      setTimeout(() => {
        setStatusMessage({ status: 'hide' })
      }, 5000)
    } catch (exception) {
      setStatusMessage({ status: 'error', message: 'Blog couldn\'d be liked' })
      setTimeout(() => {
        setStatusMessage({ status: 'hide' })
      }, 5000)
    }
  }

  const handleDelete = async () => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!conf)
      return
    try {
      const resp = await blogService.del(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setStatusMessage({ status: 'success', message: 'Blog post deleted' })
      setTimeout(() => {
        setStatusMessage({ status: 'hide' })
      }, 5000)
    } catch (exception) {
      setStatusMessage({ status: 'error', message: 'Blog couldn\'t be deleted' })
      setTimeout(() => {
        setStatusMessage({ status: 'hide' })
      }, 5000)
    }
  }

  return <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel="view" ref={blogToggleRef}>
      <div>{blog.content}</div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
      <div>{blog.user.name}</div>
      {blog.user.username === user.username ? <button  onClick={handleDelete}>remove</button> : ''}
    </Togglable>
  </div>
}

export default Blog