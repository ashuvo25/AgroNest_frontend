import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiMenu, FiHome, FiUser } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Header */}
        <div className="p-4 md:px-8 lg:px-16 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <FiMenu className="h-6 w-6 text-gray-600 cursor-pointer md:hidden" />
            <h1 className="text-xl md:text-2xl font-bold text-green-700 flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              AgroNest
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/home_page')} className="text-green-700 font-medium hover:text-green-800 flex items-center gap-2">
              <FiHome className="h-5 w-5" />
              হোম
            </button>
            <button onClick={() => handleNavigation('/browse')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              <FiSearch className="h-5 w-5" />
              ব্রাউজ
            </button>
            <button onClick={() => handleNavigation('/cart')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              <FiShoppingCart className="h-5 w-5" />
              কার্ট
            </button>
            <button onClick={() => handleNavigation('/agriculture')} className="text-gray-600 font-medium hover:text-green-700 flex items-center gap-2">
              <FiUser className="h-5 w-5" />
              প্রোফাইল
            </button>
          </div>

          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <FiBell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <FiShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-5 w-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
            </button>
            <div className="hidden md:block h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 md:px-8 lg:px-16 bg-white border-b">
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
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-3 p-4 md:px-8 lg:px-16 bg-white shadow-sm">
        {[
          { name: 'বীজ', icon: '🌱', color: 'bg-green-100' },
          { name: 'যন্ত্রপাতি', icon: '🚜', color: 'bg-blue-100' },
          { name: 'সার', icon: '💧', color: 'bg-yellow-100' },
          { name: 'কীটনাশক', icon: '🌿', color: 'bg-red-100' },
          { name: 'সেচ ব্যবস্থা', icon: '💦', color: 'bg-purple-100' },
          { name: 'টুলস', icon: '🔧', color: 'bg-orange-100' },
          { name: 'স্টোরেজ', icon: '🏪', color: 'bg-indigo-100' },
          { name: 'প্রযুক্তি', icon: '📱', color: 'bg-pink-100' },
        ].map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all"
          >
            <div className={`${category.color} p-3 rounded-full text-2xl shadow-sm`}>
              {category.icon}
            </div>
            <p className="text-xs mt-2 text-center font-medium text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Seasonal Offers */}
      <div className="p-4 md:px-8 lg:px-16">
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-6 rounded-xl text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">মৌসুমি ফসলের বিক্রয়</h2>
          <p className="text-lg mb-4 opacity-90">কৃষি সামগ্রীতে ৪০% পর্যন্ত ছাড়</p>
          <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-sm">
            এখনই কিনুন
          </button>
        </div>

        {/* Featured Products */}
        <div className="mt-8 pb-20"> {/* Added pb-20 for bottom navigation spacing */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">বৈশিষ্ট্যযুক্ত পণ্য</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              {
                name: 'প্রিমিয়াম বীজ',
                category: 'বীজ',
                price: '৳২,৪৯৯',
                image: '🌾',
              },
              {
                name: 'জৈব সার',
                category: 'সার',
                price: '৳৩,৪৯৯',
                image: '🌿',
              },
              {
                name: 'স্মা���্ট সেচ সিস্টেম',
                category: 'প্রযুক্তি',
                price: '৳২৯,৯৯৯',
                image: '💧',
              },
              {
                name: 'হাতের যন্ত্রপাতি সেট',
                category: 'যন্ত্রপাতি',
                price: '৳৮,৯৯৯',
                image: '🔨',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2 text-center bg-green-50 p-3 rounded-lg">
                  {item.image}
                </div>
                <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{item.category}</p>
                <p className="text-green-700 font-bold text-sm mb-2">{item.price}</p>
                <button className="w-full bg-green-600 text-white py-1.5 rounded text-sm hover:bg-green-700 transition-all">
                  কার্টে যোগ করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 px-2 py-1.5 flex justify-around">
        <button onClick={() => handleNavigation('/home_page')} className="text-green-700 flex flex-col items-center">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] mt-0.5">হোম</span>
        </button>
        <button onClick={() => handleNavigation('/browse')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🔍</span>
          <span className="text-[10px] mt-0.5">অনুসন্ধান</span>
        </button>
        <button onClick={() => handleNavigation('/cart')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🛒</span>
          <span className="text-[10px] mt-0.5">কার্ট</span>
        </button>
        <button onClick={() => handleNavigation('/agriculture')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] mt-0.5">প্রোফাইল</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
