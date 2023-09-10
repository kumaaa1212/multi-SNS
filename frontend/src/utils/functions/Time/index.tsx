export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${month}-${day} ${hours}:${minutes}`
}
