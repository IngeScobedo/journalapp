import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/JournalSlice'
import { startSavingNote } from '../../store/journal/thunks'
import { ImageGallery } from '../components'

export const Note = () => {
  const dispatch = useDispatch()
  const { active: note } = useSelector(state => state.journal)

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

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

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
        <Button onClick={handleSaveNote} color='primary'>
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
      <ImageGallery />
    </Grid>
  )
}
