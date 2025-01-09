import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiMenu, FiHome, FiUser } from 'react-icons/fi';

const SeasonalOffers: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  
  const offers = [
    {
      title: "মৌসুমি ফসলের বিক্রয়",
      description: "কৃষি সামগ্রীতে ৪০% পর্যন্ত ছাড়",
      buttonText: "এখনই কিনুন",
      bgColor: "from-green-500/60 via-green-600/60 to-green-700/60", // Reduced opacity from 90 to 70
      image: "src/assets/rice-field.jpg",
      icon: "🌾"
    },
    {
      title: "বীজ উৎসব",
      description: "প্রিমিয়াম বীজে ৩০% ছাড়",
      buttonText: "অফার দেখুন",
      bgColor: "from-blue-500/60 via-blue-600/60 to-blue-700/60", // Reduced opacity from 90 to 70
      image: "src/assets/vegetable-garden.jpg",
      icon: "🌱"
    },
    {
      title: "যন্ত্রপাতি মেলা",
      description: "নতুন যন্ত্রপাতিতে বিশেষ মূল্যছাড়",
      buttonText: "দেখে নিন",
      bgColor: "from-purple-500/60 via-purple-600/60 to-purple-700/60", // Reduced opacity from 90 to 70
      image: "src/assets/rice-field.jpg",
      icon: "🚜"
    },
    {
      title: "স্মার্ট কৃষি প্যাকেজ",
      description: "আধুনিক প্রযুক্তি সরঞ্জামে ২৫% ছাড়",
      buttonText: "বিস্তারিত",
      bgColor: "from-orange-500/60 via-orange-600/60 to-orange-700/60", // Reduced opacity from 90 to 70
      image: "src/assets/smart-farming.jpg",
      icon: "📱"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000); // Change offer every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div 
        className="transition-transform duration-500 ease-in-out flex"
        style={{ transform: `translateX(-${currentOffer * 100}%)` }}
      >
        {offers.map((offer, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative shadow-lg"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 z-10 bg-gradient-to-br ${offer.bgColor}`} />
            
            {/* Content */}
            <div className="relative z-20 p-4 text-center text-white">
              <span className="text-3xl mb-1 block">{offer.icon}</span>
              <h2 className="text-xl font-bold mb-1">{offer.title}</h2>
              <p className="text-base mb-3 opacity-90">{offer.description}</p>
              <button className="bg-white/95 px-5 py-1.5 rounded-lg font-semibold hover:bg-white transition-all shadow-sm text-gray-800 text-sm">
                {offer.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dot indicators - moved closer to bottom */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-2 z-30"> {/* Changed bottom-2 to bottom-1 */}
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentOffer(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentOffer === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
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
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <FiBell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={() => handleNavigation('/Cart')} className="p-2 hover:bg-gray-100 rounded-full relative">
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

      {/* Main content with reduced width */}
      <div className="max-w-6xl mx-auto px-4"> {/* Added max-width container */}
        {/* Categories */}
        <div className="grid grid-cols-4 gap-3 p-4 bg-white shadow-sm mt-4 rounded-lg">
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
        <div className="mt-4">
          <SeasonalOffers />

          {/* Featured Products */}
          <div className="mt-8 pb-20"> {/* Added pb-20 for bottom navigation spacing */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">বৈশিষ্ট্যযুক্ত পণ্য</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'প্রিমিয়াম বীজ',
                  category: 'বীজ',
                  price: '৳২,৪৯৯',
                  image: 'src/assets/rice-field.jpg',
                },
                {
                  name: 'গাছ পাকা টমেমো',
                  category: 'সবজি',
                  price: '৳৩,৪৯৯',
                  image: 'src/assets/vegetable-garden.jpg',
                },
                {
                  name: 'স্মার্ট সেচ সিস্টেম',
                  category: 'প্রযুক্তি',
                  price: '৳২৯,৯৯৯',
                  image: 'src/assets/rice-field.jpg',
                },
                {
                  name: 'হাতের যন্ত্রপাতি সেট',
                  category: 'যন্ত্রপাতি',
                  price: '৳৮,৯৯৯',
                  image: 'src/assets/smart-farming.jpg',
                  
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-20 mb-2 bg-green-50 rounded-lg overflow-hidden"> {/* reduced from h-24 to h-20 */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xs leading-tight mb-1"> {/* decreased from text-sm */}
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] text-gray-600">
                      {item.category}
                    </p>
                    <p className="text-green-700 font-bold text-xs">
                      {item.price}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="w-full bg-gray-600 text-white py-1.5 rounded text-[10px] sm:text-xs hover:bg-blue-700 transition-all">
                      কিনুন
                    </button>
                    <button className="w-full bg-green-600 text-white py-1.5 rounded text-[10px] sm:text-xs hover:bg-green-700 transition-all">
                      যোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 px-2 py-1.5 flex justify-around">
        <button onClick={() => handleNavigation('/home_page')} className="text-green-700 flex flex-col items-center">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] mt-0.5">হোম</span>
        </button>
        <button onClick={() => handleNavigation('/marketplace')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🏪</span>
          <span className="text-[10px] mt-0.5">মার্কেট</span>
        </button>
        <button onClick={() => handleNavigation('/ai_ml')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🤖</span>
          <span className="text-[10px] mt-0.5">AI/ML</span>
        </button>
        <button onClick={() => handleNavigation('/rent')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🚜</span>
          <span className="text-[10px] mt-0.5">ভাড়া করুন</span>
        </button>
        <button onClick={() => handleNavigation('/profile')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] mt-0.5">প্রোফাইল</span>
        </button>
       
      </div>
    </div>
  );
};

export default HomePage;
