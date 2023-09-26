import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import '../styles/global/globals.scss'
import '../styles/layout/header.scss'
import '../styles/layout/footer.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/notFound.scss'
import '../styles/MarkDown/MarkDown.scss'
import store from 'store/store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
