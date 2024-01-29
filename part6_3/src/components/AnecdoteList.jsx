import { useDispatch, useSelector } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
  
    const vote = (anecdote) => {
      dispatch({
        type: 'anecdotes/voteAnec',
        payload: anecdote.id,
      })
      dispatch({
        type: 'notification/displayNotification',
        payload: { status: 'success', message: `you voted ${anecdote.content}`},
      })
      setTimeout(() => {
        dispatch({
          type: 'notification/hideNotification'
        })
      }, 5000)
    }

    return <>
    {anecdotes.filter(x => x.content.includes(filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}</>
}

export default AnecdoteForm