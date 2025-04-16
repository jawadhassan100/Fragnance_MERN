import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Navbar from './components/Navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Register from './pages/Register.jsx/Register';
import Login from './pages/Login/Login';
import { AuthProvider } from './pages/AuthContext';

const App = () => {
  return (
    <>
    <AuthProvider>

      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/whychooseus' element={<WhyChooseUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App