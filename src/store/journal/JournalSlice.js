import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
  // active: {
  //   id: 'abc',
  //   title: '',
  //   body: '',
  //   date: 23089,
  //   imageUrls: []
  // }
}

const JournalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    noteUpdated: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      state.messageSaved = `${action.payload.title}, actualizada correctamente`
    },
    deleteNoteById: (state, action) => {

    },
    setPhotosToActiveNote: (state, action) => {
      state.active.images = [...state.active.images, ...action.payload]
      state.isSaving = false
    }
  }
})

export const {
  save,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote
} = JournalSlice.actions

export default JournalSlice.reducer
