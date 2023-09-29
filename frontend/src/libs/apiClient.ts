import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://backend-dgjc.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
