import {
  collection,
  doc,
  setDoc
} from 'firebase/firestore/lite'
import {
  FirebaseDB
} from '../../firebase/config'
import {
  fileUpload,
  loadNotes
} from '../../helpers'
import {
  addNewEmptyNote,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote
} from './JournalSlice'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {
      uid
    } = getState().auth
    const newNote = {
      title: 'Nueva nota',
      body: '',
      date: new Date().getTime(),
      images: []
    }
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
    dispatch(savingNewNote())
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
  }
}

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(savingNewNote())
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
      dispatch(noteUpdated(note))
    } catch (error) {

    }
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(savingNewNote())

    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToActiveNote(photosUrls))
  }
}
