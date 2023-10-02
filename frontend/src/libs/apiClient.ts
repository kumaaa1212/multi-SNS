import axios from 'axios'

const defaultBaseURL = 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL || defaultBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
