import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [statusMessage, setStatusMessage] = useState({ status: 'hide' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogContent, setBlogContent] = useState('')

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

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        blogTitle, blogAuthor, blogUrl, blogContent
      })
      setBlogs(blogs.concat(blog))
      setStatusMessage({ status: 'success', message: `a new blog ${blog.title} by ${blog.author} added`  })
      setTimeout(() => {
        setStatusMessage({ status: 'hide' })
      }, 5000)
    } catch (exception) {
      setStatusMessage({ status: 'error', message: 'Bad input' })
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

  const newBlog = () => (
    <form onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        content
        <input
          type="text"
          value={blogContent}
          name="Url"
          onChange={({ target }) => setBlogContent(target.value)}
        />
      </div>
      <button type="submit">create</button>
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
        <>{userInfo()}{newBlog()}{blogList()}</>
      }
    </div>
  )
}

export default App