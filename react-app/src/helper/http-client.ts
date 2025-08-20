import axios from 'axios'

import { BASE_API_URL } from '@/config'

export const httpClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
