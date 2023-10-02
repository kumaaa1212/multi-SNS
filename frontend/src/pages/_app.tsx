import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import '../styles/global/globals.scss'
import '../styles/layout/header.scss'
import '../styles/layout/footer.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/notFound.scss'
import '../styles/MarkDown/MarkDown.scss'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import store from 'store/store'
import createEmotionCache from '../createEmotionCache'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </CacheProvider>
  )
}

export default MyApp
