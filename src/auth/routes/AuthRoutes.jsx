import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '../pages'

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='/*' element={<Navigate path='/auth/login' />} />
      </Routes>
    </>
  )
}
