import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { supabase } from '@/utils/supabaseClient'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import ModalWind from '@/components/parts/Modal/LoginModal'
import Link from 'next/link'

const defaultTheme = createTheme()
export default function SignUp() {
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [team, setteam] = useState<any>('')
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            bio: '自己紹介文を入力してください',
            team: team,
            icon: `cscscscscsbtnmmyjnhfgbdfvsdca`,
            follow: [],
            follower: [],
          },
        },
      })
      setOpen(true)
    } catch (error) {
      alert('エラーが発生しました')
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && (
        <ModalWind>
          {open ? (
            <div>
              <p>
              {email}
                に仮登録完了メールを送りました。メール内のリンクをクリックして登録を完了してください。
              </p>
              <Link href={'/login'}>閉じる</Link>
            </div>
          ) : (
            <CircularProgress color='inherit' />
          )}
        </ModalWind>
      )}
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
            新規登録
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='Name'
                  label='Name'
                  name='Name'
                  autoComplete='family-name'
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>TEAM</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={team}
                    label='Age'
                    onChange={(e) => setteam(e.target.value)}
                  >
                    <MenuItem value={'FC東京'}>FC東京</MenuItem>
                    <MenuItem value={'川崎フロンターレ'}>川崎フロンターレ</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='npassword'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className='handle_btn'>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
