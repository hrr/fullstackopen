import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogToggleRef = useRef()
  const blogToggle = () => {
    blogToggleRef.current.toggleVisibility()
  }

  return <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel="view" ref={blogToggleRef}>
      <div>{blog.content}</div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button>like</button></div>
      <div>{blog.user.name}</div>
    </Togglable>
  </div>
}

export default Blog