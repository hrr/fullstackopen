const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      state = { ...state, good: state.good + 1 }
      break
    case 'OK':
      state = { ...state, ok: state.ok + 1 }
      break
    case 'BAD':
      state = { ...state, bad: state.bad + 1 }
      break
    case 'RESET':
      state = initialState
      break
    case 'ZERO':
      break
  }
  return state

}

export default counterReducer
