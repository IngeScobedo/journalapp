import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent' // temporary
        open
        sx={{
          display: { sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
          >
            Alan Escobedo
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
                ['enero', 'febrero'].map((text, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TurnedInNot />
                      </ListItemIcon>
                      <Grid>
                        <ListItemText primary={text} />
                        <ListItemText secondary='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe exercitationem possimus, pariatur mollitia sapiente natus, esse magnam perspiciatis ullam quidem, suscipit odio!' />
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                ))
            }
        </List>
      </Drawer>
    </Box>
  )
}

SideBar.propTypes = {
  drawerWidth: PropTypes.number
}
