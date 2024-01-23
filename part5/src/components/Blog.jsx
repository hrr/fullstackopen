import { useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, setStatusMessage }) => {
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
      setStatusMessage({ status: 'error', message: 'wrong username or password' })
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
    </Togglable>
  </div>
}

export default Blog