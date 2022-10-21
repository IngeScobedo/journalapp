import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { startCreatingUserWithEmail } from '../../store/auth/thunks'

const registerFormData = {
  name: '',
  email: '',
  password: ''
}

const registerFormValidators = {
  email: [(value) => value.includes('@'), 'El correo electronico no es válido'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 letras'],
  name: [(value) => value.length >= 1, 'Este no es un nombre válido']
}

export const SignUp = () => {
  const dispatch = useDispatch()

  const { name, email, password, nameValid, emailValid, passwordValid, onInputChange, isFormValid, formState } = useForm(registerFormData, registerFormValidators)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) return
    dispatch(startCreatingUserWithEmail(formState))
  }
  return (
    <AuthLayout title='Sign Up'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Full Name'
              name='name'
              value={name}
              onChange={onInputChange}
              type='text'
              placeholder='Your name'
              fullWidth
              required
              error={!!nameValid}
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
              error={!!emailValid}
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
              error={!!passwordValid}
            />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid item sx={12} sm={12}>
              <Button type='submit' variant='contained' fullWidth>
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
