import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import '../styles/global/globals.scss'
import '../styles/layout/header.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/sidebar.scss'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { AppDispatch, RootState } from '@/store/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
