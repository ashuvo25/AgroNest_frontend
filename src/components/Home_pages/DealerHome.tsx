import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTruck, FiPackage, FiUsers, FiMap, FiBarChart2, FiShoppingBag } from 'react-icons/fi';
// import MobileNavigation from '../shared/MobileNavigation';

const DealerHome: React.FC = () => {
//   const navigate = useNavigate();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50/50 to-green-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">ডিলার ড্যাশবোর্ড</h1>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FiTruck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Distribution Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'মোট স্টক', value: '১২,০০০ কেজি', icon: <FiPackage />, color: 'bg-blue-100' },
            { label: 'অধীনস্থ বিক্রেতা', value: '৪৫', icon: <FiUsers />, color: 'bg-green-100' },
            { label: 'কভারেজ এলাকা', value: '১২', icon: <FiMap />, color: 'bg-purple-100' },
            { label: 'মোট বিক্রয়', value: '৳৫,০০,০০০', icon: <FiBarChart2 />, color: 'bg-yellow-100' },
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
          {/* Active Distributions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">চলমান ডেলিভারি</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FiTruck className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">ট্রাক-{i + 1}</div>
                      <div className="text-sm text-gray-600">পথে: ময়মনসিংহ</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-blue-600">৫,০০০ কেজি</div>
                    <div className="text-sm text-gray-500">আনুমানিক: ২ ঘণ্টা</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">স্টক আপডেট</h2>
            <div className="space-y-4">
              {[
                { name: 'ধান বীজ', stock: '২,০০০ কেজি', status: 'low' },
                { name: 'সার', stock: '৫,০০০ কেজি', status: 'good' },
                { name: 'কীটনাশক', stock: '৫০০ লিটার', status: 'critical' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.status === 'critical' ? 'bg-red-100' :
                      item.status === 'low' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <FiShoppingBag className={`${
                        item.status === 'critical' ? 'text-red-600' :
                        item.status === 'low' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.stock}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                    অর্ডার করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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

export default DealerHome;
