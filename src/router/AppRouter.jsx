import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { JournalRoutes } from '../journal/'

import { CheckingAuth } from '../ui/components/CheckingAuth'

export const AppRouter = () => {
  const status = useCheckAuth()

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
