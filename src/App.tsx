import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AgricultureApp from './components/AgricultureApp'
import HomePage from './components/HomePage'  
import BlogApp from './components/BlogApp'
import LearningPage from './components/LearningPage'
import InformationDesk from './components/InfoDesk'
import Cart from './components/AddToCart'
import ProfilePage from './components/ProfilePage';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/infodesk" element={<InformationDesk />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/blog" element={<BlogApp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/agriculture" element={<AgricultureApp />} />
        <Route path="/home_page" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/bankai" element={<BankaiPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
