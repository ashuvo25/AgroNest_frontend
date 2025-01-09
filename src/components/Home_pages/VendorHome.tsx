import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiDollarSign, FiTruck, FiUsers, FiPlus, FiPackage } from 'react-icons/fi';

const VendorHome: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
      navigate(path);
    };

  const salesData = [
    { day: 'রবি', amount: 15000 },
    { day: 'সোম', amount: 22000 },
    { day: 'মঙ্গল', amount: 18000 },
    { day: 'বুধ', amount: 25000 },
    { day: 'বৃহ', amount: 20000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50/50 to-emerald-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">বিক্রেতা ড্যাশবোর্ড</h1>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'মোট বিক্রয়', value: '৳১,২৫,০০০', icon: <FiDollarSign />, color: 'bg-green-100' },
            { label: 'অর্ডার সংখ্যা', value: '৪৫', icon: <FiBox />, color: 'bg-blue-100' },
            { label: 'ডেলিভারি', value: '৩২', icon: <FiTruck />, color: 'bg-yellow-100' },
            { label: 'গ্রাহক', value: '১২৮', icon: <FiUsers />, color: 'bg-purple-100' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-xl p-4`}>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">সাম্প্রতিক অর্ডার</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FiPackage className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">অর্ডার #০০{i + 1}</div>
                      <div className="text-sm text-gray-600">৩ টি আইটেম</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">৳২,৫০০</div>
                    <div className="text-sm text-gray-500">আজ, ১০:৩০</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">বিক্রয় পরিসংখ্যান</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 bg-green-100 rounded-t hover:bg-green-200 transition-all cursor-pointer"
                    style={{ height: `${data.amount / 500}px` }}
                  />
                  <div className="text-sm text-gray-600">{data.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 px-2 py-1.5 flex justify-around">
        <button onClick={() => handleNavigation('/home_page')} className="text-green-700 flex flex-col items-center">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] mt-0.5">হোম</span>
        </button>
        <button onClick={() => handleNavigation('/marketplace')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🏪</span>
          <span className="text-[10px] mt-0.5">মার্কেট</span>
        </button>
        {/* <button onClick={() => handleNavigation('/ai_ml')} className="text-gray-600 flex flex-col items-center">
          <span className="text-2xl">🤖</span>
          <span className="text-[10px] mt-0.5">AI/ML</span>
        </button> */}
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

export default VendorHome;
