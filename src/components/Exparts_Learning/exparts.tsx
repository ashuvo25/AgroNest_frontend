import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AgricultureExpertBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState('8:00');

  // Add state for image loading errors
  const [bgImgError, setBgImgError] = useState(false);
  const [profileImgError, setProfileImgError] = useState(false);

  // Default images
  const DEFAULT_BG = '/src/assets/default-bg.jpg';
  const DEFAULT_PROFILE = '/src/assets/default-profile.jpg';

  const dates = [
    { day: 22, weekday: 'শুক্রবার' },
    { day: 23, weekday: 'শনিবার' },
    { day: 24, weekday: 'রবিবার' },
    { day: 25, weekday: 'সোমবার' },
  ];

  const times = ['7:30', '8:00', '8:30', '9:00'];
  const handleExpertClick = () => {
    navigate('/exparts'); // Assuming '/expert-details' is the route for exparts.tsx
  };
  return (
    <div className="relative pb-24 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="max-w-md mx-auto p-6">
        {/* Expert Info Section */}
        <div className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border border-emerald-100">
          <div className="relative h-40">
            {/* Background with overlay */}
            <div className="absolute inset-0">
              <img
                src={bgImgError ? DEFAULT_BG : "/src/assets/eng.jpg"}
                alt="Background"
                className="w-full h-full object-cover"
                onError={() => setBgImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-700/80"></div>
            </div>
            
            {/* Header buttons */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button 
              onClick={handleExpertClick}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-emerald-100 hover:scale-105">
                <ChevronLeft className="w-5 h-5 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-emerald-100">
                <Heart className="w-5 h-5 text-rose-600" />
              </button>
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src={profileImgError ? DEFAULT_PROFILE : "/src/assets/eng.jpg"}
                alt="Agriculture Expert"
                className="w-full h-full object-cover"
                onError={() => setProfileImgError(true)}
              />
            </div>
          </div>

          {/* Profile Info - Translated */}
          <div className="pt-20 p-6 bg-gradient-to-b from-white to-emerald-50/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-100 hover:bg-amber-100 transition-all">
                ★ ৪.৬
              </span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100 hover:bg-blue-100 transition-all">
                সার্টিফাইড কৃষিবিদ
              </span>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mb-3">
              <h1 className="text-2xl font-bold text-emerald-900 mb-1">ড. সারাহ জনসন</h1>
              <p className="text-emerald-700 text-sm font-medium">পিএইচডি ইন এগ্রিকালচারাল সাইন্সেস</p>
            </div>
            <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
              <p className="text-purple-700 text-sm">টেকসই কৃষি বিশেষজ্ঞ</p>
            </div>
          </div>
        </div>

        {/* Stats Section - Translated */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4">
            <p className="font-bold text-2xl text-emerald-700">৮+</p>
            <p className="text-emerald-900 text-sm">বছরের অভিজ্ঞতা</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4">
            <p className="font-bold text-2xl text-emerald-700">৩.৫হা+</p>
            <p className="text-emerald-900 text-sm">পরামর্শ</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4">
            <p className="font-bold text-2xl text-emerald-700">২.৮হা+</p>
            <p className="text-emerald-900 text-sm">রিভিউ</p>
          </div>
        </div>

        {/* Action Buttons - Updated with image icons and Bangla text */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4 group">
            <span className="block text-center">
              <img 
                src="/src/assets/icons/phone.png"
                alt="কল" 
                className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-emerald-900">কল</span>
            </span>
          </button>
          <button className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4 group">
            <span className="block text-center">
              <img 
                src="/src/assets/icons/video.png" 
                alt="ভিডিও" 
                className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-emerald-900">ভিডিও</span>
            </span>
          </button>
          <button className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4 group">
            <span className="block text-center">
              <img 
                src="/src/assets/icons/chat.png" 
                alt="মেসেজ" 
                className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-emerald-900">মেসেজ</span>
            </span>
          </button>
          <button className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all p-4 group">
            <span className="block text-center">
              <img 
                src="/src/assets/icons/scadule.png"
                alt="শিডিউল" 
                className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-emerald-900">শিডিউল</span>
            </span>
          </button>
        </div>

        {/* Date Selection - Translated */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-emerald-900">তারিখ নির্বাচন করুন</h3>
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md rounded-xl px-4 py-2 border border-white/50">
              <button className="text-emerald-700">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-800">জানুয়ারি</span>
              <button className="text-emerald-700">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {dates.map((date) => (
              <button
                key={date.day}
                onClick={() => setSelectedDate(date.day)}
                className={`p-3 rounded-xl transition-all ${
                  selectedDate === date.day
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100'
                }`}
              >
                <p className="text-sm mb-1">{date.weekday}</p>
                <p className="font-semibold">{date.day}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection - Translated */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md p-6 mb-8">
          <p className="text-emerald-900 font-medium mb-4">সময় নির্বাচন করুন</p>
          <div className="flex justify-between items-center">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-5 rounded-xl transition-all ${
                  selectedTime === time
                    ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Book Button - Translated */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-emerald-100">
        <div className="max-w-md mx-auto">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold 
            transition-all shadow-lg active:scale-[0.98]">
            কৃষি পরামর্শ বুক করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgricultureExpertBooking;