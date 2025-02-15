import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Navbar from './components/Navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/whychooseus' element={<WhyChooseUs/>}/>
      </Routes>
    </>
  )
}

export default App