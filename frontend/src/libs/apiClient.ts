import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
