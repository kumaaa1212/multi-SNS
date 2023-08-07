import axios from 'axios'
// インスタンスを作成する
const apiClient = axios.create({
  baseURL: 'http://localhost:4001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient