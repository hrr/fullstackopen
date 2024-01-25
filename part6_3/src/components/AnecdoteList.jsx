import { voteAnec } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
  
    const vote = (id) => {
      dispatch(voteAnec(id))
    }

    return <>
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
    )}</>
}

export default AnecdoteForm