import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Navbar from './components/Navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
      </Routes>
    </>
  )
}

export default App