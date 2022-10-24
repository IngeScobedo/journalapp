import {
  collection,
  doc,
  setDoc
} from 'firebase/firestore/lite'
import {
  FirebaseDB
} from '../../firebase/config'
import {
  loadNotes
} from '../../helpers'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes
} from './JournalSlice'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {
      uid
    } = getState().auth
    const newNote = {
      title: 'nueva nota con titulo',
      body: 'cuerpo de la nota',
      date: new Date().getTime(),
      images: []
    }
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
    dispatch(savingNewNote({
      isSaving: true
    }))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const {
      uid
    } = getState().auth
    if (!uid) throw new Error('EL USUARIO NO EXISTE')
    const loadedNotes = await loadNotes(uid)
    dispatch(setNotes(loadedNotes))
    // dispatch(setActiveNote(loadedNotes[0]))
    // dispatch(savingNewNote(true))
  }
}

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    const {
      active: note
    } = getState().journal
    const {
      uid
    } = getState().auth
    const noteToFirestore = {
      ...note
    }
    delete noteToFirestore.id
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFirestore, { merge: true })
    dispatch(savingNewNote(false))
    dispatch(startLoadingNotes())
  }
}
