import React from 'react';

// Define the type for category buttons
interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: 'ফসল', icon: 'src/assets/icons/crops.png' },
  { name: 'পশুসম্পদ', icon: 'src/assets/icons/livestock.png' },
  { name: 'যন্ত্রপাতি', icon: 'src/assets/icons/tools.png' },
  { name: 'বিজ্ঞান', icon: 'src/assets/icons/science.png' },
  { name: 'সার', icon: 'src/assets/icons/fertilizer.png' },
  { name: 'বীজ', icon: 'src/assets/icons/seeds.png' },
];

// Define the type for featured items
interface FeaturedItem {
  name: string;
  image: string;
}

const featuredItems: FeaturedItem[] = [
  { name: 'ধান', image: 'src/assets/rice-field.jpg' },
  { name: 'ফসল', image: 'src/assets/vegetable-garden.jpg' },
  { name: 'কৃষি যন্ত্র', image: 'src/assets/smart-farming.jpg' },
];

const AgricultureApp: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] fixed top-0 w-full z-50 rounded-b-2xl shadow-sm">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="lg:hidden text-gray-600 cursor-pointer">☰</span>
                <h1 className="text-xl md:text-2xl font-bold text-green-700 flex items-center gap-2">
                  <span className="text-2xl">🌾</span>
                  AgroNest
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { icon: '🏠', label: 'হোম', active: true },
                  { icon: '✨', label: 'কোর্স' },
                  { icon: '🌿', label: 'ব্লগ' },
                  { icon: '📚', label: 'আমাদের সম্পর্কে' },
                  { icon: '💬', label: 'যোগাযোগ' },
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`text-[15px] font-medium flex items-center gap-2
                              ${item.active ? 'text-green-700' : 'text-gray-600 hover:text-green-700'}`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <span className="text-xl">🔔</span>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <span className="text-xl">🛒</span>
                  <span className="absolute top-0 right-0 h-5 w-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
                </button>
                <div className="hidden md:block h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="p-3 md:px-8 lg:px-16 bg-white border-b">
            <div className="max-w-4xl mx-auto relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
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
        </header>

        {/* Main Content */}
        <div className="mt-[72px]">
          {/* Hero Section */}
          <div className="relative h-[380px] bg-gradient-to-br from-green-800 via-green-700 to-green-600 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="absolute inset-0 backdrop-blur-[2px]">
              {/* Rice plant decorative pattern */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400/20 text-[180px]">
                🌾
              </div>
            </div>

            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl space-y-6">
                  <div className="inline-block px-4 py-1 bg-green-500/20 backdrop-blur-sm rounded-full">
                    <p className="text-green-100 text-sm font-medium">
                      ✨ সর্বশেষ কৃষি প্রযুক্তি শিখুন
                    </p>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    আধুনিক কৃষির
                    <span className="text-green-300"> সকল কোর্স</span>
                  </h2>

                  <p className="text-green-50 text-lg leading-relaxed">
                    আপনার কৃষি সম্পর্কিত সকল কোর্স এখন একই প্লাটফর্মে।
                    আধুনিক প্রযুক্তি ব্যবহার করে কৃষি শিখুন।
                  </p>


                </div>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <main className="container mx-auto px-4 -mt-16 relative z-10 mb-8">
            {/* Categories */}
            <section className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h2 className="text-lg font-bold text-[#2C5F2D] mb-6 flex items-center gap-2">
                <span className="w-1 হ-6 bg-[#2C5F2D] rounded-full"></span>
                বিভাগসমূহ
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    <div className="bg-[#E8F3E8] p-2 md:p-3 transition-all duration-300 
                                 group-hover:bg-[#D1E7D1]">
                      <div className="flex flex-col items-center">
                        <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center 
                                     justify-center mb-2 shadow-sm">
                          <img src={category.icon} alt={category.name} className="w-6 h-6 md:w-7 md:h-7" />
                        </span>
                        <span className="text-[#2C5F2D] font-medium text-xs md:text-sm text-center">{category.name}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Items */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#2C5F2D] mb-6 flex items-center gap-2">
                <span className="w-1 হ-6 bg-[#2C5F2D] rounded-full"></span>
                বৈশিষ্ট্যযুক্ত আইটেম
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map((item, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="h-48 bg-[#E8F3E8] group-hover:bg-[#D1E7D1] 
                                 transition-all duration-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-90 
                                 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                                 from-black/70 to-transparent p-6">
                        <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                        <p className="text-white/80 text-sm">বিস্তারিত তথ্য জানতে ক্লিক করুন</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer Navigation - Mobile Only */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E8F3E8] shadow-lg z-50 md:hidden">
        <nav className="container mx-auto flex justify-around py-2 max-w-6xl">
          {[
            { icon: '🏠', label: 'হোম', active: true },
            { icon: '✨', label: 'অনুসন্ধান' },
            { icon: '🌿', label: 'গ্যালারি' },
            { icon: '⚙️', label: 'সেটিংস' },
          ].map((item, index) => (
            <button 
              key={index} 
              className={`flex flex-col items-center group px-3 py-1 rounded-lg
                       ${item.active ? 'bg-[#E8F3E8]' : 'hover:bg-[#E8F3E8]/50'}`}
            >
              <div className="text-base group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                item.active ? 'text-[#2C5F2D]' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default AgricultureApp;
