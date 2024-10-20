import React from 'react';
import { useEffect } from "react"
import Footer from "./components/footer/Footer"
import Header from "./components/Header/Header"
import Routers from "./router/Routers"
import { checkTokenExpiration } from "./components/utils/checkTokenExpiration"
import { useDispatch } from "react-redux"
import { logout, setToken } from "./store/slices/authSlice"
import { fetchUserInfo } from "./store/slices/userLimitsSlice"


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const iStokenValid = checkTokenExpiration()
    if (token && iStokenValid) {
      dispatch(setToken(token))
      dispatch(fetchUserInfo())
    } else {
      dispatch(logout())
    }
  }, [dispatch])

  return (<>
    <Header />
    <Routers />
    <Footer />
  </>
  )
}

export default App
