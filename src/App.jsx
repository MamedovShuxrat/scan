import Footer from "./components/footer/Footer"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import Routers from "./router/Routers"


function App() {

  return (<>
    <Header />
    <MainPage>
      <Routers />
    </MainPage>
    <Footer />
  </>
  )
}

export default App
