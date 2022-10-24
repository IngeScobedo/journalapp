import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout'
import { Note } from '../views/Note'
import { NothingSelected } from '../views/NothingSelected'

export const Home = () => {
  const dispatch = useDispatch()
  const { active, isSaving } = useSelector(state => state.journal)

  const handleNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {
        // eslint-disable-next-line no-extra-boolean-cast
        (!!active)
          ? <Note />
          : <NothingSelected />
      }
      {/* <Note /> */}
      <IconButton
        disabled={isSaving}
        onClick={handleNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
          zIndex: 20
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
