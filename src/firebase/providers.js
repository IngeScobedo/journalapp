import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
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

export const registerUserWithEmail = async ({ email, password, displayName }) => {
  try {
    const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = res.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code
    }
  }
}

export const signInWithEmail = async ({ userEmail, password }) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, userEmail, password)
    console.log('response', response)
    const { uid, photoURL, email, displayName } = response.user
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
