import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AgricultureApp from './components/AgricultureApp'
import HomePage from './components/HomePage'  
import BlogApp from './components/BlogApp'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/blog" element={<BlogApp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/agriculture" element={<AgricultureApp />} />
        <Route path="/home_page" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
