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
    savingNewNote: (state, action) => {
      state.isSaving = action.payload
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {

    },
    updateNote: (state, action) => {

    },
    deleteNoteById: (state, action) => {

    }
  }
})

export const {
  save,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote
} = JournalSlice.actions

export default JournalSlice.reducer
