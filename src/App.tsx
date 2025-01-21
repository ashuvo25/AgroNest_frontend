import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
// import AgricultureApp from '../public/AgricultureApp'
import HomePage from './components/Home_pages/HomePage'  
import BlogApp from './components/BlogApp'
import LearningPage from './components/Exparts_Learning/LearningPage'
import InformationDesk from './components/Info_event/InfoDesk'
import Cart from './components/AddToCart'
import ProfilePage from './components/ProfilePage';
import EventsPage from './components/Info_event/EventPage'
import Marketplace from './components/MarketPlace/Marketplace'
import RentalPage from './components/Rent/RentalPage'
import RentalDetailsPage from './components/Rent/RentalDetailsPage'
import ChatBot from './components/AI_ML/ChatBot'
import AgricultureExpertBooking from './components/Exparts_Learning/exparts'
import ExpertFinder from './components/Exparts_Learning/FindExpart'
import AiMl from './components/AI_ML/ai_ml'
import Detect from './components/AI_ML/ImageDetect'
import { DiseaseProvider } from './context/DiseaseContext';
import DealerHome from './components/Home_pages/DealerHome'
import FarmerHome from './components/Home_pages/FarmerHome'
import ExpertHome from './components/Home_pages/ExpertHome'
import VendorHome from './components/Home_pages/VendorHome'
import Dashboard from './components/dashboard/dashboard'
import InfoHub from './components/dashboard/info-hub'
import BiddingProd from './components/MarketPlace/bidding'
import CropBiddingPage from './components/MarketPlace/biddingDetails'
import OrderDetails from './components/MarketPlace/OrderDetails'



const App = () => {
  return (
    <DiseaseProvider>
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
          <Route path="/expartprof" element={<AgricultureExpertBooking />} />
          <Route path="/exparts" element={<ExpertFinder />} />
          <Route path="/ai_ml" element={<AiMl />} />
          <Route path="/image_detc" element={<Detect/>} />
          <Route path="/delar" element={<DealerHome/>} />
          <Route path="/farmer" element={<FarmerHome/>} />
          <Route path="/expart" element={<ExpertHome/>} />
          <Route path="/vendor" element={<VendorHome/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/info-hub" element={<InfoHub/>} />
          <Route path="/bidding" element={<BiddingProd/>} />
          <Route path="/biddingProduct" element={<CropBiddingPage/>} />
          <Route path="/ProductOrder" element={<OrderDetails/>} />

          OrderDetails


          

        </Routes>
      </Router>
    </DiseaseProvider>
  )
}

export default App
