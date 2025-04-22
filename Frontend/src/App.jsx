import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Navbar from './components/Navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'
import Register from './pages/Register.jsx/Register';
import Login from './pages/Login/Login';
import { AuthProvider } from './pages/AuthContext';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import CreateYourOwn from './pages/CreateYourOwn/CreateYourOwn';
import AddProduct from './pages/AddProduct/AddProduct';

const App = () => {
  return (
    <>
    <AuthProvider>

      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/single-product' element={<SingleProduct/>}/>
        <Route path='/create' element={<CreateYourOwn/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App