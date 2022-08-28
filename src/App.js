import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import AppRoutes from './config/AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <AppRoutes />
        <Footer />
      </>
    </BrowserRouter>
  )
};

export default App;
