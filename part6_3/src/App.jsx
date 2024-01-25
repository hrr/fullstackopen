import { useSelector, useDispatch } from 'react-redux'
import { createAnec, voteAnec } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(voteAnec(id))
  }

  const newAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    dispatch(createAnec(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnec}>
        <div><input name="anec" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App