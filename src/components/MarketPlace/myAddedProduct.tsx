import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const MyAddedProducts: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Header section */}
        <div className="bg-white shadow-sm w-full">
          <div className="p-4 md:px-8 lg:px-16 flex justify-between items-center border-b">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-green-700 flex items-center gap-2">
                <span className="text-2xl">🌾</span>
                AgroNest
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleNavigation('/home_page')} className="text-green-700 font-medium hover:text-green-800 flex items-center gap-2">
                🏠হোম
              </button>
              <button onClick={() => handleNavigation('/marketplace')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
                🏪মার্কেট
              </button>
              <button onClick={() => handleNavigation('/rent')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
                🚜ভাড়া
              </button>
              <button onClick={() => handleNavigation('/profile')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
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
        </div>

        {/* Search Bar - Now fixed below header */}
        <div className="bg-white border-b shadow-sm">
          <div className="p-2 md:px-8 lg:px-16"> {/* Reduced padding from p-3 to p-2 */}
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800">আমার পণ্যসমূহ</h2>
              <div className="relative flex-1 max-w-lg ml-4">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="আপনার পণ্য খুঁজুন..."
                  className="w-full pl-12 pr-4 py-1.5 rounded-full border-2 border-gray-100 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all bg-gray-50" 
                />
              </div>
            </div>
          </div>
        </div>

      {/* Main content */}
      <div className="pt-2 pb-20 px-2"> {/* Reduced from pt-24 to pt-20 */}
        <div className="max-w-5xl mx-auto">
          {/* Add Product Button - Moved to separate container */}
          <div className="sticky top-24 z-40 bg-gray-50 py-1.5 mb-1"> {/* Reduced padding and margin */}
            <button 
              onClick={() => handleNavigation('/addProduct')}
              className="ml-auto flex items-center gap-2 bg-green-600 text-white px-6 py-1.5 rounded-lg hover:bg-green-700 transition-all text-sm shadow-sm" 
            >
              <span className="text-lg">+</span>
              নতুন পণ্য যোগ করুন
            </button>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-sm p-1.5"> {/* Reduced from p-2 to p-1.5 */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="h-28 sm:h-36 mb-2 rounded-lg overflow-hidden">
                    <img 
                      src={`src/assets/${index === 0 ? 'rice-field.jpg' : 'smart-farming.jpg'}`}
                      alt={index === 0 ? "Premium Rice Seeds" : "Farming Equipment"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      {index === 0 ? 'প্রিমিয়াম ধানের বীজ' : 'কৃষি যন্ত্রপাতি'}
                    </h3>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">
                        {index === 0 ? 'পরিমাণ: ১০০ কেজি' : 'অবস্থা: নতুন'}
                      </span>
                      <span className="text-green-600 font-bold">
                        {index === 0 ? '৳২,৪৯৯' : '৳১৫,০০০'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className={index === 0 ? 'text-blue-600' : 'text-red-600'}>
                        {index === 0 ? 'স্টক: উপলব্ধ' : 'স্টক: শেষ'}
                      </span>
                      <span className="text-gray-600">
                        {index === 0 ? '০১/০৩/২৪' : '২৮/০২/২৪'}
                      </span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <button className="flex-1 bg-amber-500 text-white py-1.5 rounded text-xs hover:bg-amber-600">
                        সম্পাদনা
                      </button>
                      <button className="flex-1 bg-red-500 text-white py-1.5 rounded text-xs hover:bg-red-600">
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
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
    </div>
  );
};

export default MyAddedProducts;
