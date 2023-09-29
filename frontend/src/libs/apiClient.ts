import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://backend-dgjc.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
