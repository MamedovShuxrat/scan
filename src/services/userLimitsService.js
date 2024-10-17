import axios from "axios"
import { GET_USER_DATA_URL } from '../constants/index.js'

export const getUserInfo = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(GET_USER_DATA_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}