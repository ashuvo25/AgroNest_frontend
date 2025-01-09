import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiBook, FiMessageCircle, FiAward, FiBell, FiUser, FiTrendingUp, FiActivity } from 'react-icons/fi';

const ExpertHome: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              বিশেষজ্ঞ ড্যাশবোর্ড
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative hover:bg-gray-50 p-2 rounded-full">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              <FiBell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">ড. আহমেদ</p>
                <p className="text-xs text-gray-500">কৃষি বিশেষজ্ঞ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <FiEdit className="w-8 h-8" />,
              title: "নতুন আর্টিকেল লিখুন",
              desc: "আপনার জ্ঞান শেয়ার করুন",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: <FiMessageCircle className="w-8 h-8" />,
              title: "কৃষকের প্রশ্ন",
              desc: "নতুন প্রশ্নের উত্তর দিন",
              color: "from-green-500 to-green-600"
            },
            {
              icon: <FiBook className="w-8 h-8" />,
              title: "গবেষণা প্রকাশ",
              desc: "নতুন গবেষণা যোগ করুন",
              color: "from-purple-500 to-purple-600"
            }
          ].map((item, i) => (
            <button key={i} className="group relative overflow-hidden bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`text-gradient-to-r ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <FiBook />, label: 'মোট আর্টিকেল', value: '45', color: 'bg-blue-500' },
            { icon: <FiMessageCircle />, label: 'উত্তর দেওয়া', value: '156', color: 'bg-green-500' },
            { icon: <FiAward />, label: 'সার্টিফিকেট', value: '12', color: 'bg-yellow-500' },
            { icon: <FiTrendingUp />, label: 'রেটিং', value: '4.9', color: 'bg-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Activities & Events */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiActivity className="text-blue-500" />
              সাম্প্রতিক কার্যক্রম
            </h2>
            <div className="space-y-4">
              {[
                { title: "নতুন প্রশ্নের উত্তর দিয়েছেন", time: "১০ মিনিট আগে" },
                { title: "আর্টিকেল প্রকাশ করেছেন", time: "২ ঘণ্টা আগে" },
                { title: "সার্টিফিকেট অর্জন করেছেন", time: "১ দিন আগে" }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          // ...existing mobile navigation code...
        </div>
      </main>
    </div>
  );
};

export default ExpertHome;
