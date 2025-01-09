import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiUser } from 'react-icons/fi';

// Move these components inside FarmerHome or to separate files
const VideoPlayer = ({ videoUrl }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md">
    <div className="aspect-video">
      <iframe
        className="w-full h-full"
        src={videoUrl}
        // title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    {/* <div className="p-4">
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div> */}
  </div>
);

const WeatherWidget = () => (
  <div className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white p-4 rounded-xl">
    <h3 className="text-lg font-bold mb-2">আবহাওয়া আপডেট</h3>
    <div className="flex items-center justify-between">
      <div className="text-3xl">🌤️</div>
      <div className="text-right">
        <div className="text-2xl font-bold">২৮°C</div>
        <div className="text-sm">বৃষ্টিপাতের সম্ভাবনা: ২০%</div>
      </div>
    </div>
  </div>
);

const CropCalendar = () => (
  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
    <h3 className="text-lg font-bold text-green-800 mb-3">ফসল ক্যালেন্ডার</h3>
    <div className="space-y-2">
      {[
        { crop: "ধান", time: "রোপণের সময়", icon: "🌾" },
        { crop: "আলু", time: "ফসল কাটার সময়", icon: "🥔" },
        { crop: "পাট", time: "বীজ বোনার সময়", icon: "🌱" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg">
          <span className="text-xl">{item.icon}</span>
          <div>
            <div className="font-medium text-green-800">{item.crop}</div>
            <div className="text-sm text-green-600">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = ({ onNavigate }) => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { title: "কৃষি পরামর্শ নিন", icon: "👨‍🌾", color: "bg-green-100" },
      { title: "রোগ সনাক্তকরণ", icon: "🔍", color: "bg-yellow-100" },
      { title: "বাজার দর দেখুন", icon: "💰", color: "bg-blue-100" },
      { title: "প্রশিক্ষণ ভিডিও", icon: "🎥", color: "bg-red-100" },
    ].map((action, i) => (
      <button
        key={i}
        className={`${action.color} p-4 rounded-xl hover:shadow-md transition-all`}
        onClick={() => onNavigate('/path')}
      >
        <div className="text-2xl mb-2">{action.icon}</div>
        <div className="text-sm font-medium">{action.title}</div>
      </button>
    ))}
  </div>
);

const FarmerHome: React.FC = () => {
  // Move hooks inside the component
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50/50 to-green-50 pb-16">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6">স্বাগতম, কৃষক ভাই</h1>
        
        {/* Quick Actions */}
        <QuickActions onNavigate={handleNavigation} />

        {/* Weather and Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <WeatherWidget />
          <CropCalendar />
        </div>

        {/* Featured Videos */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">কৃষি টিউটোরিয়াল</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VideoPlayer videoUrl="https://www.youtube.com/embed/example1" />
            <VideoPlayer videoUrl="https://www.youtube.com/embed/example2" />
          </div>
        </div>

        {/* Daily Tips */}
        <div className="mt-8 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">আজকের টিপস</h3>
          <p className="text-yellow-700">
            বীজতলা তৈরির আগে মাটি পরীক্ষা করে নিন। মাটির pH মান ৬.৫-৭.০ এর মধ্যে থাকা উচিত।
          </p>
        </div>
      </div>

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

export default FarmerHome;
