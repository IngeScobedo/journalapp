import { registerUserWithEmail, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './AuthSlice'

export const checkingAuth = (email, password) => {
  return async (dispath) => {
    dispath(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispath) => {
    dispath(checkingCredentials())
    const result = await signInWithGoogle()
    console.log({ result })
    if (!result.ok) return dispath(logout(result.errorMessage))
    dispath(login(result))
  }
}

export const startCreatingUserWithEmail = ({ name, email, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials())
    const res = await registerUserWithEmail({ name, email, password })
    console.log(res)
  }
}
