import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import { loginUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import ToastBase from 'components/parts/Toast'
import styles from './Login.module.scss'

const defaultTheme = createTheme()

interface LoginType {
  email: string
  password: string
}

export default function Login(): JSX.Element {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const { control, handleSubmit, getValues } = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginType> = async () => {
    const value = getValues()
    try {
      const res = await apiClient.post('/auth/login', {
        email: value.email,
        password: value.password,
      })
      localStorage.setItem('auth_token', res.data.token)
      console.log(res.data.user)
      dispatch(loginUser(res.data.user))
      router.push('/home')
    } catch {
      toastFunc('ログインに失敗しました', true)
    }
  }

  return (
    <Layout>
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
                render={({ field, fieldState }): JSX.Element => (
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
                render={({ field, fieldState }): JSX.Element => (
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
      <div className={styles.toast}>
        <ToastBase isError={isError} active={isToast} content={toastContent} />
      </div>
    </Layout>
  )
}
