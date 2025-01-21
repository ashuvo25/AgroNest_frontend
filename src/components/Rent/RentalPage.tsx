import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowLeft, Star, Calendar, MapPin, Clock, Shield, Tag, Info, Filter, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: number;
  name: string;
  category: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  location: string;
  owner: {
    name: string;
    rating: number;
    verified: boolean;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  images: string[];
  specifications: {
    [key: string]: string;
  };
  condition: string;
  reviews: number;
  avgRating: number;
}

const RentalPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('সব');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsFilterOpen(!isFilterOpen);
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) && 
        !target.closest('button[data-filter-button="true"]')
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    {
      name: 'সব',
      icon: '🔧'
    },
    {
      name: 'ট্র্যাক্টর',
      icon: '🚜',
      items: [{
        id: 1,
        name: 'সোনালিকা DI-745 III ট্র্যাক্টর',
        dailyRate: 5000,
        image: 'src/assets/images/tractro.jpg',
        location: 'রাজশাহী'
      }]
    },
    {
      name: 'হারভেস্টার',
      icon: '🌾',
      items: [{
        id: 2,
        name: 'কুবোটা DC-70 হারভেস্টার',
        dailyRate: 8000,
        image: 'src/assets/images/harvester.jpg',
        location: 'দিনাজপুর'
      }]
    },
    {
      name: 'সেচ যন্ত্র',
      icon: '💧',
      items: [{
        id: 3,
        name: 'শক্তিমান পাম্প সেট',
        dailyRate: 1500,
        image: 'src/assets/images/harvester.jpg',
        location: 'বগুড়া'
      }]
    },
    {
      name: 'স্প্রেয়ার',
      icon: '🌿',
      items: [{
        id: 4,
        name: 'ব্যাটারি স্প্রেয়ার',
        dailyRate: 800,
        image: 'src/assets/images/tractro.jpg',
        location: 'ঢাকা'
      }]
    },
    {
      name: 'রোটাভেটর',
      icon: '⚙️',
      items: [{
        id: 5,
        name: 'মাল্টি-টিলার রোটাভেটর',
        dailyRate: 3000,
        image: 'src/assets/images/tractro.jpg',
        location: 'চট্টগ্রাম'
      }]
    },
    {
      name: 'থ্রেশার',
      icon: '🌲',
      items: [{
        id: 6,
        name: 'প্যাডি থ্রেশার',
        dailyRate: 4000,
        image: 'src/assets/images/tractro.jpg',
        location: 'সিলেট'
      }]
    }
  ];

  const equipmentList = categories.reduce((acc, category) => {
    if (category.items) {
      acc.push(...category.items);
    }
    return acc;
  }, []);

  const locations = ['সব', ...new Set(equipmentList.map(item => item.location))];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const handleItemClick = (equipmentId: number) => {
    navigate(`/rent/${equipmentId}`);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search with Filter Button */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="যন্ত্রপাতি খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  data-filter-button="true"
                  onClick={handleFilterClick}
                  className={`px-4 py-2 ${isFilterOpen ? 'bg-green-200' : 'bg-green-50'} text-green-700 rounded-lg flex items-center gap-2 hover:bg-green-100`}
                >
                  <Filter className="h-5 w-5" />
                  <span>ফিল্টার {isFilterOpen ? '✕' : ''}</span>
                </button>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border"
                  >
                    {/* Categories Section */}
                    <div className="p-4 border-b">
                      <h3 className="font-semibold mb-2">ক্যাটাগরি</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category, index) => (
                          index !== 0 && (
                            <button
                              key={category.name}
                              onClick={() => setSelectedCategory(category.name)}
                              className={`p-2 rounded-lg flex items-center gap-2 text-sm ${
                                selectedCategory === category.name
                                  ? 'bg-green-100 text-green-800'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <span>{category.icon}</span>
                              <span>{category.name}</span>
                            </button>
                          )
                        ))}
                      </div>
                    </div>

                    {/* Locations Section */}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">অবস্থান</h3>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedLocation === location
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedCategory !== 'সব' || selectedLocation !== 'সব') && (
                      <div className="p-4 bg-gray-50 rounded-b-lg border-t">
                        <div className="flex flex-wrap gap-2">
                          {selectedCategory !== 'সব' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {selectedCategory}
                            </span>
                          )}
                          {selectedLocation !== 'সব' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {selectedLocation}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* View Mode Toggles */}
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {equipmentList
            .filter(item => {
              const matchesCategory = selectedCategory === 'সব' || 
                categories.find(c => c.name === selectedCategory)?.items?.some(i => i.id === item.id);
              const matchesLocation = selectedLocation === 'সব' || item.location === selectedLocation;
              return matchesCategory && matchesLocation;
            })
            .map(equipment => (
              <div 
                key={equipment.id} 
                onClick={() => handleItemClick(equipment.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name}
                    className="w-full h-32 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
                  />
                    <div className="absolute top-2 right-2 bg-green-200 px-2 py-1 rounded-full text-xs text-black">
                    {categories.find(c => c.items?.some(i => i.id === equipment.id))?.name}
                    </div>
                </div>
                
                <div className="p-3 bg-gray-200">
                  <h3 className="font-medium text-gray-800 truncate">
                    {equipment.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{equipment.location}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">দৈনিক ভাড়া</p>
                      <p className="font-bold text-green-600">৳{equipment.dailyRate}</p>
                    </div>
                    <button className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">
                      বিস্তারিত
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
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
    </div>
  );
};

export default RentalPage;
