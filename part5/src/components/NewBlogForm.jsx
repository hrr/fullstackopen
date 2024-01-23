import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setStatusMessage, toggleVisibility, setBlogs, blogs }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [blogContent, setBlogContent] = useState('')
      
    const handleAddBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.create({
              blogTitle, blogAuthor, blogUrl, blogContent
            })
            setBlogs(blogs.concat(blog))

            setBlogTitle('')
            setBlogAuthor('')
            setBlogUrl('')
            setBlogContent('')

            toggleVisibility()
            setStatusMessage({ status: 'success', message: `a new blog ${blog.title} by ${blog.author} added` })
            setTimeout(() => {
                setStatusMessage({ status: 'hide' })
            }, 5000)
        } catch (exception) {
            setStatusMessage({ status: 'error', message: `Bad input ${exception}` })
            setTimeout(() => {
                setStatusMessage({ status: 'hide' })
            }, 5000)
        }
    }

    return <form onSubmit={handleAddBlog}>
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
}

export default NewBlog