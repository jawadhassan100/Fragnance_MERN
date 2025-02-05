import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App