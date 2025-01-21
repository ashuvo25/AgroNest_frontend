import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CropBiddingPage: React.FC = () => {
  const [currentBid, setCurrentBid] = useState<number>(1000);
  const [userBid, setUserBid] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [auctionDetails] = useState({
    startPrice: 800,
    reservePrice: 1500,
    minimumIncrement: 10,
    startDate: "2025-01-19T00:00:00",
    endDate: "2025-01-22T23:59:59"
  });

  const [biddingHistory] = useState([
    { bidder: "কৃষক জো", amount: 950, time: "২ মিনিট আগে" },
    { bidder: "এগ্রোটেক", amount: 900, time: "৫ মিনিট আগে" },
    { bidder: "হারভেস্ট কোং", amount: 850, time: "১০ মিনিট আগে" },
  ]);

  const images = [
    "src/assets/vegetable-garden.jpg",
    "src/assets/smart-farming.jpg",
    "src/assets/rice-field.jpg",
    "src/assets/farming-trainig.jpeg",
    "src/assets/farmer.jpg",
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Calculate remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(auctionDetails.endDate).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setRemainingTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionDetails.endDate]);

  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseFloat(userBid) <= currentBid) {
      alert("Bid must be higher than current bid!");
      return;
    }
    setCurrentBid(parseFloat(userBid));
    setUserBid("");
  };

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
    // Add your chat implementation logic here
  };

  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'owner'}>>([
    {text: "স্বাগতম! আমি আপনাকে কিভাবে সাহায্য করতে পারি?", sender: 'owner'}
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {text: newMessage, sender: 'user'}]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 flex items-center gap-4 shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
        >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
          
        </button>
        <h1 className="text-xl text-white font-semibold">বিডিং বিস্তারিত</h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-[250px] rounded-lg overflow-hidden">
                <img 
                  src={images[activeStep]} 
                  alt={`Product ${activeStep + 1}`}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <button 
                  onClick={handleNext}
                  disabled={activeStep === images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </button>
                <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Grade A
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`
                      flex-shrink-0 w-20 h-16 rounded-md overflow-hidden cursor-pointer
                      ${activeStep === index ? 'ring-2 ring-green-600' : 'ring-1 ring-gray-200'}
                    `}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'শুরুর মূল্য', value: auctionDetails.startPrice },
                { label: 'বর্তমান দর', value: currentBid },
                { label: 'সর্বনিম্ন মূল্য', value: auctionDetails.reservePrice },
                { label: 'ন্যূনতম বৃদ্ধি', value: auctionDetails.minimumIncrement }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-lg font-bold text-green-700">৳{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                অবশিষ্ট সময়
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: remainingTime.days, label: 'দিন' },
                  { value: remainingTime.hours, label: 'ঘণ্টা' },
                  { value: remainingTime.minutes, label: 'মিনিট' },
                  { value: remainingTime.seconds, label: 'সেকেন্ড' }
                ].map((time, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">{time.value}</div>
                    <div className="text-xs text-gray-600">{time.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bidding Form */}
            <form onSubmit={handleBidSubmit} className="bg-white rounded-lg shadow-md p-6">
              <input
                type="number"
                value={userBid}
                onChange={(e) => setUserBid(e.target.value)}
                placeholder="আপনার দর দিন"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={currentBid + auctionDetails.minimumIncrement}
                step={auctionDetails.minimumIncrement}
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              >
                দর জমা দিন
              </button>
            </form>

            {/* Bidding History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                দরের ইতিহাস
              </h3>
              <div className="space-y-3">
                {biddingHistory.map((bid, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="text-sm font-medium">{bid.bidder}</span>
                      <span className="text-xs text-gray-500 ml-2">{bid.time}</span>
                    </div>
                    <span className="text-green-600 font-bold">৳{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col">
          {/* Chat Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">পণ্যের মালিক</h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-green-700 p-1 rounded"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fixed Chat Button */}
      <button
        onClick={handleChatClick}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>পণ্যের মালিকের সাথে চ্যাট করুন</span>
      </button>
    </div>
  );
};

export default CropBiddingPage;