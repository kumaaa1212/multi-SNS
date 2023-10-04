export const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return ''

  const parts = timestamp.split(/[T:.Z-]/)

  const year = parts[0]
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)
  const hours = parseInt(parts[3], 10)
  const minutes = parseInt(parts[4], 10)

  return `${year}/${month}/${day}/${hours}:${minutes}`
}
