import axios from "axios"
import { toast } from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL
const authLogin = `${API_URL}/api/v1/account/login/`

export const loginUser = async (login, password) => {
  try {
    const response = await toast.promise(
      axios.post(authLogin, { login, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }),
      {
        loading: "Входим в систему...",
        success: "Успешный вход в систему!",
        error: "Ошибка входа"
      })

    return response.data
  } catch (error) {
    console.log(error, 'errrrr');

    const errorMessage = error.response?.data?.message || 'Не удалось войти в систему.'
    toast.error(errorMessage);
    throw error
  }
}