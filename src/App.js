import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./config/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <AppRoutes />
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App;