// import axios from 'axios'
// const baseUrl = '/api/anecdotes'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = () => {
    //   const request = axios.get(baseUrl)
    //   return request.then(response => response.data)

    const anecdotesAtStart = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    return anecdotesAtStart.map(x => ({
        content: x,
        id: getId(),
        votes: 0
    }))
}

const create = (data) => {
    //   const { anecdoteContent } = data
    //   const reqBody = { content: anecdoteContent }
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': token
    //   }
    //   const request = axios.post(baseUrl, reqBody, { headers })
    //   const response = request.then(response => response.data)
    //   return response
    return {
        content: data,
        id: getId(),
        votes: 0
    }
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