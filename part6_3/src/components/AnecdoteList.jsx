import { voteAnec } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
  
    const vote = (id) => {
      dispatch(voteAnec({
        type: 'anecdotes/voteAnec',
        payload: id,
      }))
    }

    return <>
    {anecdotes.filter(x => x.content.includes(filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
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