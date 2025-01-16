import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiMenu, FiHome, FiUser } from 'react-icons/fi';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans" style={{
      '--mint-50': '#f0fdf4',
      '--mint-100': '#dcfce7',
      '--mint-200': '#bbf7d0',
    } as React.CSSProperties}>
      {/* Header with Navigation - Full width */}
      <div className="bg-white shadow-sm sticky top-0 z-50 w-full">
        {/* Top Header */}
        <div className="p-4 md:px-8 lg:px-16 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            {/* <FiMenu className="h-6 w-6 text-gray-600 cursor-pointer md:hidden" /> */}
            <h1 className="text-xl md:text-2xl font-bold text-green-700 flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              AgroNest
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/home_page')} className="text-green-700 font-medium hover:text-green-800 flex items-center gap-2">
              {/* <FiHome className="h-5 w-5" /> */}
              🏠হোম
            </button>
            <button onClick={() => handleNavigation('/marketplace')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              🏪মার্কেট
            </button>
            <button onClick={() => handleNavigation('/rent')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              🚜ভাড়া
            </button>
            <button onClick={() => handleNavigation('/profile')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              {/* <FiUser className="h-5 w-5" /> */}
              👤প্রোফাইল
            </button>
            <button onClick={() => handleNavigation('/ai_ml')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              🤖এআই/এমএল
            </button>
          </div>

          {/* Header Icons */}
          <div className="flex items-center space-x-4">
          
            <button onClick={() => handleNavigation('/Cart')} className="p-2 hover:bg-gray-100 rounded-full relative">
              <FiShoppingCart className="h-6 w-6 text-gray-600" />
             
            </button>
            <div className="hidden md:block h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>


        <div className="grid grid-cols-3 gap-4 p-4 bg-white shadow-sm mt-0 rounded-lg">
          {[
            { name: 'মার্কেট', icon: '🏪', color: 'bg-blue-100', path: '/marketplace' },
            { name: 'বিডিং', icon: '💰', color: 'bg-amber-100', path: '/bidding' },     // Changed from 🔨 to 💰
            { name: 'রিকোয়েস্ট', icon: '📝', color: 'bg-green-100', path: '/rent' },    // Changed from 📋 to 📝
            // { name: 'সবগুলো', icon: '📋', color: 'bg-purple-100', path: '/all' },
          ].map((category, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(category.path)}
              className={`${category.color} flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all`}
            >
              <div className="p-3 rounded-full text-2xl shadow-sm">
                {category.icon}
              </div>
              <p className="text-xs mt-1 text-center font-medium text-gray-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>


        {/* Search Bar */}
        {/* <div className="p-3 md:px-8 lg:px-16 bg-white border-b">
          <div className="max-w-4xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="বীজ, যন্ত্রপাতি বা কৃষি সরঞ্জাম খুঁজুন..."
              className="w-full pl-12 pr-4 py-2.5 rounded-full border-2 border-gray-100 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all bg-gray-50"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition-all">
              খুঁজুন
            </button>
          </div>
        </div> */}
      </div>

      {/* Main content with reduced width */}
      <div className="max-w-6xl mx-auto px-4 mb-2"> {/* Added mb-20 for bottom spacing */}
        {/* Categories */}
        

        {/* Seasonal Offers */}
        <div className="mt-0  ">
          {/* Fixed Header with Search */}
          <div className="fixed left-0 right-0 bg-white shadow-sm z-40 px-4 py-3">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">বৈশিষ্ট্যযুক্ত পণ্য</h2>
                <div className="relative max-w-xs">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="পণ্য খুঁজুন..."
                    className="pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none w-full bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add spacing for fixed header and bottom navigation */}
          <div className="pt-16 pb-24"> {/* Changed pb-20 to pb-24 */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'প্রিমিয়াম বীজ',
                  category: 'বীজ',
                  price: '৳২,৪৯৯',
                  image: 'src/assets/rice-field.jpg',
                  bgColor: 'bg-green-100',
                  amount : "১00 কেজি"
                  
                },
                {
                  name: 'যন্ত্রপাতি সেট',
                  category: 'যন্ত্রপাতি',
                  price: '৳৮,৯৯৯',
                  image: 'src/assets/smart-farming.jpg',
                  bgColor: 'bg-green-100',
                  amount : "১000 কেজি"
                  
                },
                {
                  name: 'উন্নত মানের সার',
                  category: 'সার',
                  price: '৳১,৯৯৯',
                  image: 'src/assets/rice-field.jpg',
                  bgColor: 'bg-green-100',
                  amount : "12000 কেজি"
                 
                },
                {
                  name: 'জৈব কীটনাশক',
                  category: 'কীটনাশক',
                  price: '৳৯৯৯',
                  image: 'src/assets/vegetable-garden.jpg',
                  bgColor: 'bg-green-100',
                  amount : "১00 কেজি"
                  
                },
                {
                  name: 'জৈব কীটনাশক',
                  category: 'কীটনাশক',
                  price: '৳৯৯৯',
                  image: 'src/assets/vegetable-garden.jpg',
                  bgColor: 'bg-green-100',
                  amount : "১0 কেজি"
                 
                }
                ,
                {
                  name: 'জৈব কীটনাশক',
                  category: 'কীটনাশক',
                  price: '৳৯৯৯',
                  image: 'src/assets/vegetable-garden.jpg',
                  bgColor: 'bg-green-100',
                  amount : "১00 কেজি"
                
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} p-3 rounded-lg shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="h-20 mb-2 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    
                    <h3 className="font-bold text-gray-800 text-xs leading-tight">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] text-blue-600 font-medium">
                      {item.category}
                    </p>
                    <p className="text-[10px] text-amber-600 font-medium">
                    {item.amount}
                    </p>
                    <p className="text-[10px] text-green-600 font-bold">
                      {item.price}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleNavigation('/Cart')} 
                      className="w-full bg-gray-600 text-white py-1.5 rounded text-[10px] sm:text-xs hover:bg-gray-700 transition-all flex items-center justify-center gap-1"
                    >
                      <FiShoppingCart className="h-3 w-3" />
                      কার্ট
                    </button>
                    <button 
                      className="w-full bg-green-600 text-white py-1.5 rounded text-[10px] sm:text-xs hover:bg-green-700 transition-all flex items-center justify-center gap-1"
                    >
                      <span>💳</span>
                      কিনুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    {/* Mobile Bottom Navigation - 3D Style */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white to-slate-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200 px-2 py-2 flex justify-around">
  {[
    { path: '/home_page', icon: '🏠', text: 'হোম' },
    { path: '/marketplace', icon: '🏪', text: 'মার্কেট' },
    { path: '/ai_ml', icon: '🤖', text: 'AI/ML' },
    { path: '/rent', icon: '🚜', text: 'ভাড়া করুন' },
    { path: '/profile', icon: '👤', text: 'প্রোফাইল' }
  ].map((item, index) => (
    <button 
      key={index}
      onClick={() => handleNavigation(item.path)} 
      className={`text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg 
        ${index !== 4 ? 'border-r border-slate-200' : ''} 
        hover:bg-[var(--mint-100)] hover:shadow-lg transform hover:-translate-y-0.5 
        transition-all duration-200 active:translate-y-0 active:shadow-inner
        ${activeTab === item.path ? 'bg-[var(--mint-100)] shadow-inner text-green-700' : ''}`}
    >
      <span className="text-xl drop-shadow-sm">{item.icon}</span>
      <span className={`text-[11px] mt-0.5 font-medium ${activeTab === item.path ? 'text-green-700' : 'text-slate-600'}`}>
        {item.text}
      </span>
    </button>
  ))}
</div>
    </div>
  );
};

export default HomePage;
