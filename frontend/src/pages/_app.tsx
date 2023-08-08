import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import '../styles/global/globals.scss'
import '../styles/layout/header.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/footer.scss'
import '../styles/layout/sidebar.scss'
import { Provider } from 'react-redux'
import store from '@/store/store'
export default function App({ Component, pageProps }: AppProps) {
  
  
  return (  
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
