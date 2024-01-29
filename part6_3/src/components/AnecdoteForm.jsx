import { createAnec } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
    const newAnec = (event) => {
      event.preventDefault()
      const content = event.target.anec.value
      event.target.anec.value = ''
      dispatch(createAnec({
        type: 'anecdotes/createNote',
        payload: content,
      }))
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={newAnec}>
            <div><input name="anec" /></div>
            <button type="submit">create</button>
        </form></div>
}

export default AnecdoteForm