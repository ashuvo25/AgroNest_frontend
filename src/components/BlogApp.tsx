import React from 'react';

const BlogApp: React.FC = () => {
  const articles = [
    {
      author: "ড. সারাহ জনসন",
      title: "টেকসই কৃষি পদ্ধতি: আধুনিক কৃষির গাইড",
      date: "২ আগস্ট ২০২৩",
      // readTime: "১০ মিনি�� পড়া",
      category: "কৃষি",
      image: "src/assets/smart-farming.jpg"
    },
    {
      author: "প্রফেসর মাইকেল চেন",
      title: "জৈব কীটনাশক পদ্ধতি: উন্নত ফসল উৎপাদনের জন্য",
      date: "২ আগস্ট ২০২৩",
      // readTime: "৮ মিনিট পড়া",
      category: "ফসল সুরক্ষা",
      image: "src/assets/vegetable-garden.jpg"
    },
    {
      author: "ড. মারিয়া গার্সিয়া",
      title: "কৃষি প্রযুক্তিতে উদ্ভাবন: ২০২৩ সালের ট্রেন্ড",
      date: "২ আগস্ট ২০২৩",
      // readTime: "১২ মিনিট পড়া",
      category: "প্রযুক্তি",
      image: "src/assets/smart-farming.jpg"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] fixed top-0 w-full z-50 rounded-b-2xl shadow-sm">
        <div className="container mx-auto px-3 max-w-5xl">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-base md:text-lg font-bold text-green-700 flex items-center gap-2">
              <span className="text-xl">🌾</span>
              AgroNest ব্লগ
            </h1>

            {/* Desktop Navigation - New */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { icon: '🏠', label: 'হোম', active: true },
                { icon: '📚', label: 'আমার ব্লগ' },
                { icon: '✏️', label: 'লিখুন' },
                { icon: '👤', label: 'প্রোফাইল' },
              ].map((item, index) => (
                <button 
                  key={index} 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                           ${item.active 
                             ? 'bg-[#E8F3E8] text-[#2C5F2D]' 
                             : 'hover:bg-[#E8F3E8]/50 text-gray-600'}`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Action Buttons */}
            <div className="flex gap-4 md:hidden">
              <button className="p-2 hover:bg-green-50 rounded-full">✏️</button>
              <button className="p-2 hover:bg-green-50 rounded-full">🔔</button>
              <button className="p-2 hover:bg-green-50 rounded-full">👤</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 max-w-5xl mt-[65px]">
        {/* Category Tabs */}
        <div className="flex gap-2 py-3 mb-4 overflow-x-auto">
          {["সকল", "কৃষি", "পশুসম্পদ", "প্রযুক্তি", "গবেষণা", "বাজার"].map((tab, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap
                        ${index === 0 
                          ? 'bg-green-700 text-white' 
                          : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-4">
          <input
            type="search"
            placeholder="নিবন্ধ খুঁজুন..."
            className="w-full bg-white text-black px-4 py-2 rounded-lg text-sm
                     border border-gray-200 focus:outline-none focus:border-green-500
                     placeholder:text-gray-500 shadow-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-4 py-3">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 flex gap-3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-50 rounded-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-green-600 font-medium">{article.category}</span>
                  <h2 className="text-sm sm:text-base font-bold mt-1 text-gray-800 line-clamp-2">{article.title}</h2>
                  <p className="text-xs text-gray-600 mt-1">
                    লেখক {article.author} • {article.date}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-xs text-green-600 hover:text-green-700">
                    আরও পড়ুন →
                  </button>
                  <button className="text-sm text-gray-400 hover:text-red-500">❤️</button>
                  <button className="text-sm text-gray-400 hover:text-green-600">🔖</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Navigation - Modified for mobile only */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E8F3E8] shadow-lg z-50 md:hidden">
        <nav className="container mx-auto flex justify-around py-1.5 max-w-6xl">
          {[
            { icon: '🏠', label: 'হোম', active: true },
            { icon: '📚', label: 'আমার ব্লগ' },
            { icon: '✏️', label: 'লিখুন' },
            { icon: '👤', label: 'প্রোফাইল' },
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

export default BlogApp;
