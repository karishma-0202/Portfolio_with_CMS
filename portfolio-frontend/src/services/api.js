import axios from 'axios'

const api = axios.create({
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://portfoliowithcms-production.up.railway.app',
})

export default api