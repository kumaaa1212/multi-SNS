import Layout from '@/components/layout'
import '../styles/global/globals.scss'
import type { AppProps } from 'next/app'
import '../styles/layout/header.scss'
import '../styles/Material/styles.scss'
import '../styles/layout/footer.scss'
import '../styles/layout/sidebar.scss'
import { AuthProvider } from '@/context/auth'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
