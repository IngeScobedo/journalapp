import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startEmailAndPasswordSignIn, startGoogleSignIn } from '../../store/auth/thunks'

const loginFormData = {
  userEmail: '',
  password: ''
}

const loginFormValidators = {
  userEmail: [(value) => value.includes('@'), 'El correo electronico debe de contener @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 letras']
}

export const Login = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { userEmail, password, onInputChange, isFormValid, formState, userEmailValid, passwordValid } = useForm(loginFormData, loginFormValidators)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startEmailAndPasswordSignIn(formState))
  }

  const handleGoogleSignin = () => {
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
              name='userEmail'
              onChange={onInputChange}
              value={userEmail}
              error={!!userEmailValid && formSubmitted}
              helperText={userEmailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid display={errorMessage ? '' : 'none'} item sx={12} sm={12}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
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
