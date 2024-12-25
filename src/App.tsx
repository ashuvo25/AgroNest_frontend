import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
// import AgricultureApp from '../public/AgricultureApp'
import HomePage from './components/HomePage'  
import BlogApp from './components/BlogApp'
import LearningPage from './components/LearningPage'
import InformationDesk from './components/InfoDesk'
import Cart from './components/AddToCart'
import ProfilePage from './components/ProfilePage';
import EventsPage from './components/EventPage'
import Marketplace from './components/Marketplace'
import RentalPage from './components/RentalPage'
import RentalDetailsPage from './components/RentalDetailsPage'
import ChatBot from './components/ChatBot'



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
        <Route path="/rent" element={<RentalPage />} />
        <Route path="/rent/:id" element={<RentalDetailsPage />} />
        <Route path="/home_page" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event" element={<EventsPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/chat" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
