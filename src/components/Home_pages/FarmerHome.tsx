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

// Add new interface
interface HeroSlide {
  title: string;
  description: string;
  bgImage: string;
  buttonText: string;
  buttonLink: string;
}

// Replace MarketUpdate interface with StatInfo interface
interface StatInfo {
  title: string;
  value: string;
  icon: string;
  description: string;
}

interface AgriStat {
  title: string;
  value: string;
  icon: string;
  description: string;
  trend?: string;
}

// Add new guidelines interface
interface Guideline {
  title: string;
  points: string[];
}

// Add new interface for diseases
interface Disease {
  name: string;
  icon: string;
  description: string;
}

interface ToolUsage {
  title: string;
  points: { icon: string; text: string }[];
}

// Add new interface for KnowledgeHub
interface KnowledgeItem {
  title: string;
  description: string;
  icon: string;
}

const knowledgeHub: KnowledgeItem[] = [
  {
    title: "শস্য বৈচিত্র্য",
    description: "একাধিক শস্য একসাথে চাষাবাদ",
    icon: "🌱"
  },
  {
    title: "সার ব্যবস্থাপনা",
    description: "সঠিক মাত্রায় সার প্রয়োগ",
    icon: "🌿"
  },
  {
    title: "মাটির গুণগত মান",
    description: "উপযুক্ত মাটি নির্বাচন ও পরীক্ষা",
    icon: "🌍"
  }
];

const FarmerHome: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeTab, setActiveTab] = useState<string>('/farmer');

  // Add new state for hero slider
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Add hero slides data
  const heroSlides: HeroSlide[] = [
    {
      title: "স্মার্ট কৃষি প্রযুক্তি",
      description: "আধুনিক প্রযুক্তি ব্যবহার করে আপনার কৃষি উৎপাদন বাড়ান",
      bgImage: "/src/assets/smart-farming.jpg",
      buttonText: "আরও জানুন",
      buttonLink: "/smart-farming"
    },
    {
      title: "কৃষি বাজার",
      description: "সরাসরি কৃষকদের কাছ থেকে তাজা পণ্য কিনুন",
      bgImage: "/src/assets/vegetable-garden.jpg",
      buttonText: "বাজারে যান",
      buttonLink: "/marketplace"
    },
    {
      title: "AI রোগ সনাক্তকরণ",
      description: "কৃত্রিম বুদ্ধিমত্তা দিয়ে ফসলের রোগ নির্ণয় করুন",
      bgImage: "/src/assets/ai-ml.jpg",
      buttonText: "পরীক্ষা করুন",
      buttonLink: "/ai_ml"
    },
    {
      title: "কৃষি প্রশিক্ষণ",
      description: "অনলাইন কৃষি প্রশিক্ষণ এবং সার্টিফিকেশন",
      bgImage: "/src/assets/farming-trainig.jpeg",
      buttonText: "ভর্তি হোন",
      buttonLink: "/learning"
    }
  ];

  // Add auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  // Replace marketUpdates with statsInfo
  const statsInfo: StatInfo[] = [
    {
      title: "নিবন্ধিত কৃষক",
      value: "১,৫০,০০০+",
      icon: "👨‍🌾",
      description: "সক্রিয় কৃষক"
    },
    {
      title: "মোট লেনদেন",
      value: "৳ ২.৫ কোটি",
      icon: "💰",
      description: "সর্বমোট বাজার মূল্য"
    },
    {
      title: "সফল চাষাবাদ",
      value: "৮,০০০+",
      icon: "🌾",
      description: "সফল প্রকল্প"
    },
    {
      title: "AI পরামর্শ",
      value: "২০,০০০+",
      icon: "🤖",
      description: "রোগ সনাক্তকরণ"
    }
  ];

  const agriStats: AgriStat[] = [
    {
      title: "কৃষি জমি",
      value: "৮.৫ মিলিয়ন হেক্টর",
      icon: "🌾",
      description: "মোট চাষযোগ্য জমি",
      trend: "হ্রাসমান"
    },
    {
      title: "চাল উৎপাদন",
      value: "৩.৮ কোটি টন",
      icon: "🌾",
      description: "বার্ষিক উৎপাদন ২০২৩",
      trend: "স্থিতিশীল"
    },
    {
      title: "কৃষক সংখ্যা",
      value: "১.৬ কোটি",
      icon: "👨‍🌾",
      description: "মোট কৃষক পরিবার",
      trend: "বৃদ্ধিমান"
    },
    {
      title: "জিডিপি অবদান",
      value: "১৩.৭%",
      icon: "📈",
      description: "কৃষি খাতের অবদান",
      trend: "স্থিতিশীল"
    }
  ];

  // Add guidelines data
  const guidelines: Guideline = {
    title: "ভিডিও টিউটোরিয়াল ব্যবহারের নির্দেশনা",
    points: [
      "প্রতিটি ভিডিও সম্পূর্ণ দেখুন",
      "নোট নিয়ে রাখুন প্রয়োজনীয় পয়েন্টগুলো",
      "কোন প্রশ্ন থাকলে কমেন্ট সেকশনে জানান",
      "আপনার অভিজ্ঞতা শেয়ার করুন"
    ]
  };

  // Update the diseases data
  const diseases: Disease[] = [
    {
      name: "টমেটো পাতা ফাঙ্গাস",
      icon: "🍅",
      description: "পাতায় ফাঙ্গাসের আক্রমণ"
    },
    {
      name: "টমেটো হলুদ পাতা ভাইরাস",
      icon: "🌿",
      description: "পাতা হলুদ হয়ে যাওয়া"
    },
    {
      name: "টমেটো পাতা",
      icon: "🍃",
      description: "সাধারণ পাতার রোগ"
    },
    {
      name: "টমেটো মোজাইক ভাইরাস",
      icon: "🦠",
      description: "পাতায় মোজাইক প্যাটার্ন"
    },
    {
      name: "লেট ব্লাইট",
      icon: "⚫",
      description: "পাতা ধ্বংস রোগ"
    },
    {
      name: "ব্যাকটেরিয়াল দাগ",
      icon: "🔴",
      description: "পাতায় ব্যাকটেরিয়াল আক্রমণ"
    },
    {
      name: "সেপটোরিয়া দাগ",
      icon: "◾",
      description: "পাতায় দাগযুক্ত রোগ"
    },
    {
      name: "আগাম ধ্বংস রোগ",
      icon: "❌",
      description: "দ্রুত পাতা নষ্ট হওয়া"
    }
  ];

  const toolUsage: ToolUsage = {
    title: "টুলস ব্যবহারের নির্দেশনা",
    points: [
      { icon: "🌱", text: "রোগ সনাক্তকরণের জন্য ভালো ছবি তুলুন" },
      { icon: "📱", text: "মোবাইল অ্যাপ ব্যবহার করে সহজেই তথ্য পান" },
      { icon: "💬", text: "বিশেষজ্ঞদের সাথে চ্যাট করুন" },
      { icon: "📊", text: "ফলাফল এবং পরামর্শ সংরক্ষণ করুন" }
    ]
  };

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
    <div className="bg-gray-50 min-h-screen font-sans" style={{
            '--mint-50': '#f0fdf4',
            '--mint-100': '#dcfce7',
            '--mint-200': '#bbf7d0',
          } as React.CSSProperties}>
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
            
            <button 
              onClick={() => handleNavigation('/Cart')} 
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <FiShoppingCart className="h-6 w-6 text-gray-600" />
              
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section Slider - Fixed Button Navigation */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentHeroSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  {slide.description}
                </p>
                <button
                  onClick={() => {
                    const path = slide.buttonLink;
                    if (path) {
                      handleNavigation(path);
                    }
                  }}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                ${currentHeroSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

    {/* Feature Section - Single Video */}
     

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

      {/* KnowledgeHub Section */}
      <section className="py-12 md:py-16 mx-3">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">কৃষি জ্ঞানভান্ডার</h2>
            <p className="text-lg text-gray-600">আপনার সফল ফসলের জন্য গুরুত্বপূর্ণ তথ্য</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knowledgeHub.map((item, index) => (
              <div key={index} className="rounded-xl bg-white shadow-md hover:shadow-lg p-6 transition-all">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-bold text-slate-800 mt-4 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agricultural Stats Section */}
      {/* <section className="py-6 md:py-8 mx-3">
        <div className="container mx-auto px-3">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
            বাংলাদেশের কৃষি পরিসংখ্যান
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agriStats.map((stat, index) => (
              <div key={index} 
                   className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    stat.trend === 'বৃদ্ধিমান' ? 'bg-green-100 text-green-700' :
                    stat.trend === 'হ্রাসমান' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="font-bold text-slate-700 mb-2">{stat.title}</h3>
                <p className="text-xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Video Tutorial Section with Guidelines */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-1 border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">ভিডিও টিউটোরিয়াল</h2> */}
          
  
          {/* Tool Usage Section */}
          <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{toolUsage.title}</h3>
            <ul className="space-y-3">
              {toolUsage.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mr-3">
                    {point.icon}
                  </span>
                  <span className="text-gray-700">{point.text}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleNavigation('/tool-guide')}
              className="mt-6 w-full sm:w-auto bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">🔧</span>
              টুলস ব্যবহার গাইড
            </button>
          </div>
        </div>
        {/* <div className="grid md:grid-cols-2 gap-8">
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
            {/* </div> */}
          {/* ))}  */}
        {/* </div> */} 
       
      </div>

      {/* Mobile Bottom Navigation - 3D Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white to-slate-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200 px-2 py-2 flex justify-around">
  {[
    { path: '/farmer', icon: '🏠', text: 'হোম' },
    { path: '/marketplace', icon: '🏪', text: 'মার্কেট' },
    { path: '/ai_ml', icon: '🤖', text: 'AI/ML' },
    { path: '/rent', icon: '🚜', text: 'ভাড়া করুন' },
    { path: '/profile', icon: '👤', text: 'প্রোফাইল' }
  ].map((item, index) => (
    <button 
      onClick={() => {
        setActiveTab(item.path);
        handleNavigation(item.path);
      }}
      className={`text-slate-700 flex flex-col items-center px-3 py-1.5 rounded-lg 
        ${index !== 4 ? 'border-r border-slate-200' : ''} 
        hover:bg-[var(--mint-100)] hover:shadow-lg transform hover:-translate-y-0.5 
        transition-all duration-200 active:translate-y-0 active:shadow-inner
        ${activeTab === item.path ? 'bg-[var(--mint-100)] shadow-inner text-green-700' : ''}`}
    >
      <span className="text-xl drop-shadow-sm">{item.icon}</span>
      <span className={`text-[11px] mt-0.5 font-medium ${activeTab === item.path ? 'text-green-700' : 'text-slate-600'}`}>
        {item.text}
      </span>
    </button>
  ))}
</div>
    </div>

    

  );
};

export default FarmerHome;
