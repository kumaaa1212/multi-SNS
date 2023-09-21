import { useState, useEffect } from 'react'

const addLeadingZero = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`
}

export const useFormattedTimestamp = (timestamp: string | undefined): string => {
  const [formattedTimestamp, setFormattedTimestamp] = useState('')

  useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp)
      const month = addLeadingZero(date.getMonth() + 1)
      const day = addLeadingZero(date.getDate())
      const hours = addLeadingZero(date.getHours())
      const minutes = addLeadingZero(date.getMinutes())

      const formatted = `${month}-${day} ${hours}:${minutes}`
      setFormattedTimestamp(formatted)
    } else {
      setFormattedTimestamp('')
    }
  }, [timestamp])

  return formattedTimestamp
}
