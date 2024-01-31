import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    useEffect(() => {
      dispatch(initializeAnecdotes())  
    }, []) 
  
    const vote = (anecdote) => {
      dispatch(updateAnecdote(anecdote))
      dispatch(updateAnecdote(anecdote))
      dispatch(setNotification({ status: 'success', message: `you voted ${anecdote.content}`}))
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