import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Tag, TrendingUp, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  "সব এলাকা",
  "ঢাকা",
  "রাজশাহী",
  "খুলনা",
  "চট্টগ্রাম",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
  "বরিশাল"
];

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "প্রিমিয়াম ধান",
    image: "https://i.ibb.co/yNGkbdX/rice-paddy.jpg",
    category: "শস্য",
    currentBid: 2500,
    quantity: "১০০ কেজি",
    location: "রাজশাহী",
    district: "নাটোর",
    seller: {
      rating: 4.5
    }
  },
  {
    id: 2,
    name: "তাজা সবজি প্যাকেজ",
    image: "https://i.ibb.co/C6jv8X1/fresh-vegetables.jpg",
    category: "সবজি",
    currentBid: 800,
    quantity: "৫০ কেজি",
    location: "ময়মনসিংহ",
    district: "জামালপুর",
    seller: {
      rating: 4.0
    }
  },
  {
    id: 3,
    name: "আম (ফজলি)",
    image: "https://i.ibb.co/wcYMgNL/mango.jpg",
    category: "ফল",
    currentBid: 3500,
    quantity: "২০০ কেজি",
    location: "রাজশাহী",
    district: "চাঁপাইনবাবগঞ্জ",
    seller: {
      rating: 4.8
    }
  }
];

const ProductCard = ({ product }) => (
  <div className="bg-green-100/60 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-green-200 overflow-hidden hover:bg-green-50">
    {/* Image */}
    <div className="relative h-48">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2">
        <div className="bg-green-700 text-white px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <span className="text-yellow-300">⭐</span>
          <span className="text-sm font-medium">{product.seller.rating}</span>
        </div>
      </div>
    </div>

    <div className="p-4 space-y-3">
      {/* Name */}
      <h3 className="text-lg font-bold text-green-900 line-clamp-1">
        {product.name}
      </h3>
      
      {/* Location */}
      <p className="text-sm text-green-700 flex items-center gap-1">
        <MapPin className="w-4 h-4 text-green-600 shrink-0" />
        <span className="line-clamp-1">{product.location}, {product.district}</span>
      </p>
      
      {/* Quantity */}
      <p className="text-sm text-green-700 flex items-center gap-1 bg-green-100/50 py-1 px-2 rounded-lg">
        <Tag className="w-4 h-4 text-green-600 shrink-0" />
        পরিমাণ: {product.quantity}
      </p>
      
      {/* Price and Action */}
      <div className="flex items-center justify-between pt-2 border-t border-green-100">
        <div>
          <div className="text-xs text-green-600">বর্তমান দর</div>
          <div className="text-green-800 font-bold text-xl">
            ৳{product.currentBid.toLocaleString()}
          </div>
        </div>
        <button 
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg"
        >
          দর দিন
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  </div>
);

const handleNavigation = (path: string) => {
  window.location.href = path;
};

const Marketplace = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("সব এলাকা");
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  
  // Filter products based on search term and location
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = 
      selectedLocation === "সব এলাকা" || 
      product.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  useEffect(() => {
    // Your existing loading logic
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-green-50">
      {/* Search Bar with Location Filter */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80"
              />
            </div>
            
            {/* Location Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLocationFilter(!showLocationFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg text-green-700 hover:bg-green-100"
              >
                <MapPin className="w-4 h-4" />
                {selectedLocation}
              </button>
              
              {showLocationFilter && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-green-100 p-4 z-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {LOCATIONS.map(location => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationFilter(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          selectedLocation === location
                            ? 'bg-green-100 text-green-700'
                            : 'hover:bg-green-50'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {["সব", "শস্য", "ডাল", "সবজি", "ফল"].map(category => (
            <button 
              key={category} 
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 text-green-700 font-medium whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
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

export default Marketplace;