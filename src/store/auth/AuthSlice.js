import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', // 'checking', 'not-autheticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'autheticated' // 'checking', 'not-autheticated', 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = payload.errorMessage
    },
    logout: (state, { payload }) => {
      state.status = 'not-autheticated' // 'checking', 'not-autheticated', 'authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const { login, logout, checkingCredentials } = AuthSlice.actions

export default AuthSlice.reducer
