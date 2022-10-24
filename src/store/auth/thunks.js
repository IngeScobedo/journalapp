import { deleteDoc, doc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { logoutFirebase, registerUserWithEmail, signInWithEmail, signInWithGoogle } from '../../firebase/providers'
import { clearNotesOnLogout, deleteNoteById } from '../journal/JournalSlice'
import { checkingCredentials, login, logout } from './AuthSlice'

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials())
      const result = await signInWithGoogle()
      if (!result.ok) return dispatch(logout(result.errorMessage))
      dispatch(login(result))
    } catch (error) {
      dispatch(logout({ errorMessage: 'Error al iniciar sesión' }))
    }
  }
}

export const startCreatingUserWithEmail = ({ displayName, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials())
      const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ displayName, email, password })
      if (!ok) return dispatch(logout({ errorMessage }))
      dispatch(login({ uid, displayName, email, photoURL }))
    } catch (error) {
      dispatch(logout({ errorMessage: 'Error al crear el usuario' }))
    }
  }
}

export const startEmailAndPasswordSignIn = ({ userEmail, password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials())
      const { ok, uid, photoURL, displayName, email, errorMessage } = await signInWithEmail({ userEmail, password })
      if (!ok) return dispatch(logout({ errorMessage }))
      dispatch(login({ uid, displayName, email, photoURL }))
    } catch (error) {
      dispatch(logout({ errorMessage: 'Error al iniciar sesión' }))
    }
  }
}

export const startHandleLogoutFirebase = () => {
  return async (dispatch) => {
    try {
      await logoutFirebase()
      dispatch(clearNotesOnLogout())
      dispatch(logout({ errorMessage: null }))
    } catch (error) {
      console.error('Error al cerrar sesión')
      dispatch(logout({ errorMessage: 'Error al cerrar sesión' }))
    }
  }
}

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    try {
      const { active: note } = getState().journal
      const { uid } = getState().auth

      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
      await deleteDoc(docRef)

      dispatch(deleteNoteById(note.id))
    } catch (error) {
      throw new Error('Error al borrar la nota')
    }
  }
}
