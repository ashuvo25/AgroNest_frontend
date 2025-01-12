import React, { useState, useEffect } from 'react';
import { Sprout, ShoppingCart, Brain, BookOpen, Info, Home, Menu, User, ChevronLeft, ChevronRight, ArrowLeft, Sun, Cloud, Droplets, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiShoppingCart, FiUser } from 'react-icons/fi';
import ReactPlayer from 'react-player';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  video: string;  // Changed from image to video
  id: string;
}

interface FAQ {
  question: string;
  answer: string;
  bgColor: string;
  textColor: string;
}

interface QuickTool {
  icon: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

interface VideoTutorial {
  // title: string;
  // description: string;
  videoUrl: string;
}

const FarmerHome: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const tutorials: VideoTutorial[] = [
    {
      // title: 'রোগ সনাক্তকরণ টিউটোরিয়াল',
      // description: 'ফসলের রোগ কিভাবে সনাক্ত করবেন তার বিস্তারিত ভিডিও',
      videoUrl: 'https://youtu.be/KuXwJ86JJfc?si=6U5rj-CUQTfeXDju'  // Replace with actual video URL
    }

  ];

  const quickTools: QuickTool[] = [
    {
      icon: "🌱",
      title: "স্মার্ট চাষাবাদ",
      description: "আধুনিক প্রযুক্তি নির্ভর চাষাবাদ পদ্ধতি",
      color: "from-pink-500",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-500"
    },
    {
      icon: "🎓",
      title: "কৃষি শিক্ষা",
      description: "অনলাইন প্রশিক্ষণ ও টিউটোরিয়াল",
      color: "from-violet-500",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500"
    },
    {
      icon: "📊",
      title: "বাজার বিশ্লেষণ",
      description: "লাইভ মার্কেট ডেটা এবং বিশ্লেষণ",
      color: "from-cyan-500",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500"
    },
    {
      icon: "🤖",
      title: "কৃত্রিম বুদ্ধিমত্তা",
      description: "AI দিয়ে ফসলের রোগ নির্ণয় করুন",
      color: "from-pink-500",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-500"
      
    }
  ];

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const navigateToFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setCurrentView(feature.id);
  };

  const FeatureDetailView = ({ feature }: { feature: Feature }) => (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center text-green-600 mb-6 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          ফিরে যান
        </button>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            {feature.icon}
            <h1 className="text-2xl font-bold text-green-800 ml-3">{feature.title}</h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
          <img src={feature.image} alt={feature.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">বৈশিষ্ট্য এবং সুবিধা</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 text-green-600 mr-2">•</div>
                <span>২৪/৭ অ্যাক্সেস</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 text-green-600 mr-2">•</div>
                <span>বিশেষজ্ঞ সহায়তা</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 text-green-600 mr-2">•</div>
                <span>সহজ ব্যবহার</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView !== 'home' && selectedFeature) {
    return <FeatureDetailView feature={selectedFeature} />;
  }

  return (
    // Add pb-16 to main container to account for mobile navigation
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      {/* Header - Solid color background */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <h1 className="text-xl md:text-2xl font-bold text-green-700">AgroNest</h1>
          </div>

          {/* Center Space */}
          <div className="flex-1"></div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <FiBell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => handleNavigation('/Cart')} 
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <FiShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-5 w-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Further reduced height */}
      <section className="bg-gradient-to-br from-green-500 via-green-500 to-green-800 py-4 md:py-8 mx-3 mt-3 rounded-lg">
        <div className="container mx-auto px-3">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              ডিজিটাল সমাধানের মাধ্যমে কৃষকদের ক্ষমতায়ন
            </h2>
            <p className="text-sm md:text-base text-gray-800 mb-4">
              এগ্রোনেস্ট আপনার আঙ্গুলের ডগায় আধুনিক কৃষি সমাধান নিয়ে আসে। মার্কেটপ্লেস, 
              এআই-চালিত অন্তর্দৃষ্টি, শিক্ষণ সংস্থান, এবং কৃষি তথ্য - সবকিছু এক জায়গায়।
            </p>
          </div>
        </div>
      </section>

    {/* Feature Section - Single Video */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-1 border border-white/20 shadow-xl">
          <div className="text-center mb-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-0">ভিডিও টিউটোরিয়াল</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tutorials.map((tutorial, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gray-800 relative">
                  <ReactPlayer
                    url={tutorial.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    light  // This shows thumbnail until played
                    playing={false}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 }
                      }
                    }}
                  />
                </div>
                {/* <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600">{tutorial.description}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>

      {/* New FAQ Section */}
    
      {/* Quick Access Tools Section - Updated spacing */}
      <section className="py-4 md:py-12 mx-3 mb-4">
        <div className="container mx-auto px-3">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-8">
            অ্যাক্সেস টুলস
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 ${tool.gradient}`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 blur-2xl opacity-60 rounded-full bg-white"></div>
                <div className="relative z-10">
                  <span className="text-4xl mb-4 block">{tool.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-white/80 text-sm">{tool.description}</p>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 -mr-16 -mb-16 blur-3xl opacity-30 rounded-full bg-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Mobile Bottom Navigation - 3D Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white to-slate-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200 px-2 py-2 flex justify-around">
        <button onClick={() => handleNavigation('/home_page')} 
                className="text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg border-r border-slate-200 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-inner">
          <span className="text-xl drop-shadow-sm">🏠</span>
          <span className="text-[11px] mt-0.5 font-medium text-slate-600">হোম</span>
        </button>
        <button onClick={() => handleNavigation('/marketplace')} 
                className="text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg border-r border-slate-200 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-inner">
          <span className="text-xl drop-shadow-sm">🏪</span>
          <span className="text-[11px] mt-0.5 font-medium text-slate-600">মার্কেট</span>
        </button>
        <button onClick={() => handleNavigation('/ai_ml')} 
                className="text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg border-r border-slate-200 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-inner">
          <span className="text-xl drop-shadow-sm">🤖</span>
          <span className="text-[11px] mt-0.5 font-medium text-slate-600">AI/ML</span>
        </button>
        <button onClick={() => handleNavigation('/rent')} 
                className="text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg border-r border-slate-200 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-inner">
          <span className="text-xl drop-shadow-sm">🚜</span>
          <span className="text-[11px] mt-0.5 font-medium text-slate-600">ভাড়া করুন</span>
        </button>
        <button onClick={() => handleNavigation('/profile')} 
                className="text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-inner">
          <span className="text-xl drop-shadow-sm">👤</span>
          <span className="text-[11px] mt-0.5 font-medium text-slate-600">প্রোফাইল</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerHome;