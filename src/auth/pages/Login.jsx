import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuth, startGoogleSignIn } from '../../store/auth/thunks'
import { useMemo } from 'react'

export const Login = () => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)

  const { email, password, onInputChange } = useForm({
    email: 'alan@alan.com',
    password: '123456'
  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('login', email, password)
    dispatch(checkingAuth())
  }

  const handleGoogleSignin = () => {
    console.log('GOOGLE SIGN-IN')
    dispatch(startGoogleSignIn())
  }
  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              name='email'
              onChange={onInputChange}
              value={email}
              placeholder='correo@gmail.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='password'
              placeholder='your password'
              name='password'
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid item sx={12} sm={6}>
              <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item sx={12} sm={6}>
              <Button disabled={isAuthenticating} onClick={handleGoogleSignin} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 2 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/signup/'>
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
