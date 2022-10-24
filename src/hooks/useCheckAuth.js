import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/AuthSlice'
import { startLoadingNotes } from '../store/journal/thunks'

export const useCheckAuth = () => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      dispatch(login(user))
      dispatch(startLoadingNotes(user))
    })
  }, [])
  return status
}
