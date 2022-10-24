import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/JournalSlice'

export const SidebarItem = ({ note }) => {
  const dispatch = useDispatch()

  const { title, body } = note

  const setNote = (noteSelected) => {
    dispatch(setActiveNote(noteSelected))
  }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => setNote(note)}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={title} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}
