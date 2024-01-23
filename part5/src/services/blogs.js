import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (data) => {
  const { blogTitle, blogAuthor, blogUrl, blogContent} = data
  const reqBody = { title: blogTitle, author: blogAuthor, url: blogUrl, content: blogContent }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  const request = axios.post(baseUrl, reqBody, { headers })
  const response = request.then(response => response.data)
  return response
}

const update = (data) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  const request = axios.put(`${baseUrl}/${data.id}`, data, { headers })
  const response = request.then(response => response.data)
  return response
}



export default { getAll, setToken, create, update }