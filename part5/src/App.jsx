import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [statusMessage, setStatusMessage] = useState({ status: 'hide' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const addBlog = async ({ blogTitle, blogAuthor, blogUrl, blogContent }) => {
    newBlogFormRef.current.toggleVisibility()
    const blog = await blogService.create({
      blogTitle, blogAuthor, blogUrl, blogContent
    })
    return blog
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setStatusMessage({ status: 'success', message: 'Logged in' })
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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const userInfo = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    function checkUserDataEventHandler() {
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }

    window.addEventListener('storage', checkUserDataEventHandler)

    return () => {
      window.removeEventListener('storage', checkUserDataEventHandler)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <Notification statusMessage={statusMessage} />
      {user === null ?
        loginForm() :
        <>
          {userInfo()}
          {<Togglable buttonLabel="new blog" ref={newBlogFormRef}>
            <NewBlogForm setStatusMessage={setStatusMessage} addBlog={addBlog} setBlogs={setBlogs} blogs={blogs} />
          </Togglable>}
          {blogList()}
        </>
      }
    </div>
  )
}

export default App