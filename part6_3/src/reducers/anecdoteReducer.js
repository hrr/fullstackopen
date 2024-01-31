import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      setAnec(state, action) {
        return action.payload
      },
      appendAnec(state, action) {
        return state.concat(action.payload)
      },
      voteAnec(state, action) {
        const id = action.payload
        
        const anecdoteToChange = state.find(x => x.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        
        const newState = state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )

        return newState
      }
    }
  }
)

export const { voteAnec, setAnec, appendAnec } = anecdotesSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnec(anecs))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnec(newAnecdote))
  }
}

export default anecdotesSlice.reducer