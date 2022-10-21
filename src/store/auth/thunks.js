import { registerUserWithEmail, signInWithEmail, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './AuthSlice'

export const startGoogleSignIn = () => {
  return async (dispath) => {
    dispath(checkingCredentials())
    const result = await signInWithGoogle()
    console.log({ result })
    if (!result.ok) return dispath(logout(result.errorMessage))
    dispath(login(result))
  }
}

export const startCreatingUserWithEmail = ({ displayName, email, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ displayName, email, password })
    if (!ok) return dispath(logout({ errorMessage }))
    dispath(login({ uid, displayName, email, photoURL }))
  }
}

export const startEmailAndPasswordSignIn = ({ userEmail, password }) => {
  return async (dispath) => {
    dispath(checkingCredentials())
    const { ok, uid, photoURL, displayName, email, errorMessage } = await signInWithEmail({ userEmail, password })
    console.log({ ok, uid, photoURL, displayName, email, errorMessage })
    if (!ok) return dispath(logout({ errorMessage }))
    dispath(login({ uid, displayName, email, photoURL }))
  }
}
