import { Provider } from 'react-redux'
import Layout from 'components/layout'
import type { AppProps } from 'next/app'
import '../styles/global/globals.scss'
import '../styles/layout/header.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/sidebar.scss'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import store from 'store/store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
