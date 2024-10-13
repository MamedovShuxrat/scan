import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL
const GET_USER_DATA_URL = `${API_URL}/api/v1/account/info/`

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