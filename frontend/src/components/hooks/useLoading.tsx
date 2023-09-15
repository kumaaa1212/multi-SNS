import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useLoading = (): boolean => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const startLoading = (): void => setLoading(true)
    const stopLoading = (): void => setLoading(false)

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', stopLoading)
    router.events.on('routeChangeError', stopLoading)

    return (): void => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', stopLoading)
      router.events.off('routeChangeError', stopLoading)
    }
  }, [router])

  return loading
}
