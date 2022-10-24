import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'

import { useForm } from '../../hooks/useForm'
import { startSavingNote, startUploadingFiles } from '../../store/journal/thunks'
import { setActiveNote } from '../../store/journal/JournalSlice'

import { ImageGallery } from '../components'

export const Note = () => {
  const inputFileRef = useRef(null)
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

  const {
    title,
    body,
    date,
    isFormValid,
    onInputChange,
    formState
  } = useForm(note)

  const handleSaveNote = () => {
    if (!isFormValid) return
    dispatch(startSavingNote())
  }

  const handleInputFileChange = ({ target }) => {
    const { files } = target
    if (files === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {date}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={inputFileRef}
          type='file'
          multiple
          onChange={handleInputFileChange}
          hidden
        />
        <IconButton
          onClick={() => inputFileRef.current.click()}
          disabled={isSaving}
          color='primary'
        >
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={handleSaveNote}
          disabled={isSaving}
          color='primary'
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Title'
          name='title'
          value={title}
          onChange={onInputChange}
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que sucedio hoy?'
          name='body'
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>
      <ImageGallery images={note.images} />
    </Grid>
  )
}
