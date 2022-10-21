import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmail } from '../../store/auth/thunks'
import { useMemo, useState } from 'react'

const registerFormData = {
  displayName: '',
  email: '',
  password: ''
}

const registerFormValidators = {
  email: [(value) => value.includes('@'), 'El correo electronico debe de contener @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 letras'],
  displayName: [(value) => value.length >= 1, 'Este no es un nombre válido']
}

export const SignUp = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const isCheckingAuth = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, displayNameValid,
    emailValid, passwordValid, onInputChange,
    isFormValid, formState
  } = useForm(registerFormData, registerFormValidators)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) return
    setFormSubmitted(true)
    dispatch(startCreatingUserWithEmail(formState))
  }
  return (
    <AuthLayout title='Sign Up'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Full Name'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              type='text'
              placeholder='Your name'
              fullWidth
              required
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
              placeholder='correo@gmail.com'
              fullWidth
              required
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={onInputChange}
              placeholder='your password'
              fullWidth
              required
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
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
            <Grid item sx={12} sm={12}>
              <Button disable={isCheckingAuth} type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/login/'>
              Ya tengo cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
