import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'
import styles from './Login.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '@/libs/apiClient'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/features/userSlice'

const defaultTheme = createTheme()

interface LoginType {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const { control, handleSubmit } = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      const res = await apiClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      localStorage.setItem('auth_token', res.data.token)
      dispatch(loginUser(res.data.user))
      router.push('/home')
    } catch {
      alert('エラーが発生しました')
    }
  }

  return (
    <div className='login'>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              ログイン
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'メールアドレスを入力してください。',
                  minLength: { value: 4, message: '4文字以上で入力してください。' },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin='normal'
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label='Email Address'
                    name='email'
                    autoFocus
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'メールアドレスを入力してください。',
                  minLength: { value: 4, message: '4文字以上で入力してください。' },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin='normal'
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label='password'
                    name='password'
                    autoFocus
                  />
                )}
              />
              <div className='handle_btn'>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='/' variant='body2' className={styles.link}>
                      パスワードを忘れた場合はこちら
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='/signup' variant='body2' className={styles.link}>
                      新規登録はこちら
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}
