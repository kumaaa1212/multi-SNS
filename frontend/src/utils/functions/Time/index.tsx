export const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return ''
  // const date = new Date(timestamp)
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  // const hours = date.getHours()
  // const minutes = date.getMinutes()

  return `${timestamp}`
}
