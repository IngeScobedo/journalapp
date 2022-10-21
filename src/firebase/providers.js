import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const registerUserWithEmail = async ({ email, password, name }) => {
  try {
    const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const user = res.user
    console.log(user)
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code
    }
  }
}
