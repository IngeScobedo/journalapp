import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { AuthRoutes } from '../auth/'
import { JournalRoutes } from '../journal/'
import { FirebaseAuth } from '../firebase/config'

import { CheckingAuth } from '../ui/components/CheckingAuth'
import { login, logout } from '../store/auth/AuthSlice'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user)
      if (!user) return dispatch(logout())
      dispatch(login(user))
    })
  }, [])

  if (status === 'checking') {
    return (<CheckingAuth />)
  }
  return (
    <>
      <Routes>
        {
          status === 'autheticated'
            ? <Route path='/*' element={<JournalRoutes />} />
            : <Route path='/auth/*' element={<AuthRoutes />} />
        }
        <Route path='/*' element={<Navigate to='/auth/login' />} />
      </Routes>
    </>
  )
}
