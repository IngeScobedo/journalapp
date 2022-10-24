import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './auth/AuthSlice'
import JournalSlice from './journal/JournalSlice'

export const store = configureStore(({
  reducer: {
    auth: AuthSlice,
    journal: JournalSlice
  }
}))
