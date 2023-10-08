import { useState, useCallback } from 'react'

interface ToastData {
  toastContent: string
  isError: boolean
  isToast: boolean
  toastFunc: (content: string, isError: boolean) => void
}

export const useToast = (): ToastData => {
  const [toastContent, setToastContent] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isToast, setIsToast] = useState<boolean>(false)

  const toastFunc = useCallback((content: string, isError: boolean): void => {
    setToastContent(content)
    setIsError(isError)
    setIsToast(true)

    setTimeout(() => {
      setIsToast(false)
    }, 5000)
  }, [])

  return { toastContent, isError, isToast, toastFunc }
}
