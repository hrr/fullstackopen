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
        const newState = state.map(anecdote =>
          anecdote.id !== action.payload.id ? anecdote : action.payload
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

export const updateAnecdote = content => {
  const changedAnecdote = {
    ...content,
    votes: content.votes + 1
  }
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(voteAnec(newAnecdote))
  }
}

export default anecdotesSlice.reducer