import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://loose-flowers-train.loca.lt',
})
