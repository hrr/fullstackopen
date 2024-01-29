import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice(
    {
        name: 'notification',
        initialState: { status: 'hide', message: ''},
        reducers: {
            displayNotification(state, action) {
                state.status = action.payload.status
                state.message = action.payload.message
                return state
            },
            hideNotification(state, action) {
                state.status = 'hide'
                state.message = ''
                return state
            }
        }
    }
)

export const { displayNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer