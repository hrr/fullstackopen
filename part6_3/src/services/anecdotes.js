import axios from 'axios'
const baseUrl = 'http://localhost:3000/anecdotes'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = () => {
      const request = axios.get(baseUrl)
      return request.then(response => response.data)
}

const create = (data) => {
    //   const { anecdoteContent } = data
      const reqBody = { content: data, votes: 0 }
      const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': token
      }
      const request = axios.post(baseUrl, reqBody, { headers })
      const response = request.then(response => response.data)
      return response
}

// const update = (data) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': token
//   }
//   const request = axios.put(`${baseUrl}/${data.id}`, data, { headers })
//   const response = request.then(response => response.data)
//   return response
// }

// const del = (data) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': token
//   }
//   const request = axios.delete(`${baseUrl}/${data.id}`, { headers })
//   const response = request.then(response => response.data)
//   return response
// }


// export default { getAll, setToken, create, update, del }
export default { getAll, create }