import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  type: 'training' | 'fair' | 'workshop';
  image?: string;
  registrationLink?: string;
  isOnline: boolean;
}

const EventCard: React.FC<{ 
  event: Event; 
  variant: 'upcoming' | 'current' | 'past' | 'sponsor';
}> = ({ event, variant }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'upcoming':
        return 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200';
      case 'current':
        return 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-200';
      case 'past':
        return 'bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200';
      case 'sponsor':
        return 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200';
      default:
        return 'bg-white/90 border-gray-200';
    }
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'training':
        return 'bg-blue-100 text-blue-700';
      case 'fair':
        return 'bg-green-100 text-green-700';
      case 'workshop':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200 ${getBackgroundColor()}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full ${getTypeColor(event.type)}`}>
            {event.type === 'training' ? 'প্রশিক্ষণ' : 
             event.type === 'fair' ? 'মেলা' : 'কর্মশালা'}
          </span>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <span className="mr-2">📅</span>
            <span>{event.date}</span>
            {event.time && <span className="ml-2">| {event.time}</span>}
          </div>
          <div className="flex items-center text-sm font-medium text-gray-600">
            <span className="mr-2">{event.isOnline ? '🌐' : '📍'}</span>
            <span>{event.location}</span>
          </div>
        </div>

        {event.registrationLink && (
          <button className="mt-4 w-full py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold">
            রেজিস্ট্রেশন করুন
          </button>
        )}
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const [activeTab, setActiveTab] = useState<'upcoming' | 'current' | 'past' | 'sponsor'>('upcoming');

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'জৈব চাষাবাদ কর্মশালা',
      description: 'জৈব পদ্ধতিতে ফসল উৎপাদন ও রোগ নিয়ন্ত্রণ বিষয়ক বিশেষ কর্মশালা',
      date: '১০ এপ্রিল ২০২৪',
      time: 'সকাল ১০:০০',
      location: 'ভার্চুয়াল',
      type: 'workshop',
      registrationLink: '#',
      isOnline: true
    },
    // Add more upcoming events...
  ];

  const currentEvents: Event[] = [
    {
      id: '2',
      title: 'বসন্ত কৃষি মেলা ২০২৪',
      description: 'কৃষি প্রযুক্তি প্রদর্শনী ও বিক্রয় মেলা',
      date: '২০-২২ এপ্রিল ২০২৪',
      location: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট',
      type: 'fair',
      image: 'src/assets/fair.jpg',
      isOnline: false
    },
    // Add more current events...
  ];

  const pastEvents: Event[] = [
    {
      id: '3',
      title: 'স্মার্ট কৃষি প্রশিক্ষণ',
      description: 'আধুনিক প্রযুক্তি ব্যবহারে কৃষি উৎপাদন',
      date: '১৫ মার্চ ২০২৪',
      location: 'কৃষি অফিস, ঢাকা',
      type: 'training',
      isOnline: false
    },
    // Add more past events...
  ];

  const sponsorEvents: Event[] = [
    {
      id: '4',
      title: 'সার বিক্রি মেলা',
      description: 'কৃষি উন্নয়নে বিশেষ সার বিক্রি মেলা',
      date: '২৫-২৭ এপ্রিল ২০২৪',
      location: 'ময়মনসিংহ কৃষি বিশ্ববিদ্যালয়',
      type: 'fair',
      isOnline: false,
      image: 'src/assets/sponsor.jpg',
    }
  ];

  

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} variant="upcoming" />
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-center text-gray-500 py-8">কোন আসন্ন ইভেন্ট নেই</p>
            )}
          </div>
        );
      case 'current':
        return (
          <div className="space-y-4">
            {currentEvents.map(event => (
              <EventCard key={event.id} event={event} variant="current" />
            ))}
            {currentEvents.length === 0 && (
              <p className="text-center text-gray-500 py-8">কোন চলমান ইভেন্ট নেই</p>
            )}
          </div>
        );
      case 'past':
        return (
          <div className="space-y-4">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} variant="past" />
            ))}
            {pastEvents.length === 0 && (
              <p className="text-center text-gray-500 py-8">কোন সম্পন্ন ইভেন্ট নেই</p>
            )}
          </div>
        );
      case 'sponsor':
        return (
          <div className="space-y-4">
            {sponsorEvents.map(event => (
              <EventCard key={event.id} event={event} variant="sponsor" />
            ))}
            {sponsorEvents.length === 0 && (
              <p className="text-center text-gray-500 py-8">কোন স্পন্সর ইভেন্ট নেই</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/90 via-white to-green-50/50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-100 backdrop-blur-lg border-b border-green-700/20 z-40">
        <div className="container mx-auto px-4 h-14">
          <div className="flex items-center justify-between h-full">
            <button 
              onClick={() => handleNavigation('/home_page')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-green-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-base font-semibold text-green-800">ইভেন্টসমূহ</h1>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-6 max-w-2xl">
        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6 bg-white/50 p-1 rounded-xl backdrop-blur-sm border border-gray-200">
          {[
            { id: 'upcoming', label: 'আসন্ন', icon: '📅' },
            { id: 'current', label: 'চলমান', icon: '🎯' },
            { id: 'past', label: 'সম্পন্ন', icon: '✓' },
            { id: 'sponsor', label: 'স্পন্সর', icon: '💎' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${activeTab === tab.id 
                  ? 'bg-green-100 text-green-800 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50/50'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default EventsPage;
