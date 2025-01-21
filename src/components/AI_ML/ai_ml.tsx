import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { FiCpu, FiDatabase, FiUpload, FiBarChart2 } from 'react-icons/fi';

interface AiSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  route: string;
  bgImage: string; // Add this new property
}

interface VideoTutorial {
  title: string;
  description: string;
  videoUrl: string;
}

const AiMl: React.FC = () => {
  const handleNavigation = useNavigate();
  const [activeTab, setActiveTab] = React.useState<string>('/ai_ml');
  
  const sections: AiSection[] = [
    {
      title: 'রোগ সনাক্তকরণ',
      description: 'এআই এর মাধ্যমে ফসলের রোগ নির্ণয় করুন',
      icon: <FiCpu className="w-8 h-8" />,
      features: [
        'দ্রুত রোগ সনাক্তকরণ',
        '৯৮% নির্ভুল ফলাফল',
        'বিশেষজ্ঞ পরামর্শ',
        'ছবি ভিত্তিক বিশ্লেষণ'
      ],
      route: '/image_detc',
      bgImage: 'src/assets/disease-detection.jpg' // Add background image path
    },
    {
      title: 'মেশিন শিক্ষক',
      description: 'স্মার্ট কৃষি প্রযুক্তি শিখুন',
      icon: <FiDatabase className="w-8 h-8" />,
      features: [
        'ইন্টারেক্টিভ শিক্ষা',
        'স্মার্ট পরামর্শ',
        'আবহাওয়া পূর্বাভাস',
        'ফসল পরিকল্পনা'
      ],
      route: '/chat',
      bgImage: 'src/assets/smart-farming.jpg' // Add background image path
    }
  ];

  const tutorials: VideoTutorial[] = [
    {
      title: 'রোগ সনাক্তকরণ টিউটোরিয়াল',
      description: 'ফসলের রোগ কিভাবে সনাক্ত করবেন তার বিস্তারিত ভিডিও',
      videoUrl: 'https://youtu.be/KuXwJ86JJfc?si=6U5rj-CUQTfeXDju'  // Replace with actual video URL
    },
    {
      title: 'মেশিন লার্নিং টিউটোরিয়াল',
      description: 'স্মার্ট কৃষি প্রযুক্তি ব্যবহারের বিস্তারিত ভিডিও',
      videoUrl: 'https://youtu.be/Tb8nIdA7tVA?si=wjd0ffrvhggwHSbe'  // Replace with actual video URL
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans" style={{
         '--mint-50': '#f0fdf4',
         '--mint-100': '#dcfce7',
         '--mint-200': '#bbf7d0',
       } as React.CSSProperties}>
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50 w-full">
        <div className="p-4 md:px-8 lg:px-16 flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavigation('/home_page')} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <span>←</span>
              <span className="font-medium">হোম পেইজ</span>
            </button>
            <h1 className="text-xl font-bold text-green-700">এআই/এমএল</h1>
          </div>
          {/* ...existing navigation code... */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            স্মার্ট কৃষি সমাধান
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আধুনিক প্রযুক্তির মাধ্যমে আপনার কৃষি কাজকে আরও সহজ করুন। আমাদের এআই সিস্টেম আপনার পাশে আছে।
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigation(section.route)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Background Image with Gradient */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${section.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-900/90 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                    {section.icon}
                  </div>
                  <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                    text-white text-sm font-medium group-hover:bg-white group-hover:text-green-700 transition-all">
                    শুরু করুন →
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                <p className="text-white/90 mb-6">{section.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {section.features.map((feature, fidx) => (
                    <div
                      key={fidx}
                      className="flex items-center text-sm text-white/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        {/* <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ব্যবহার পদ্ধতি</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['১', '২', '৩'].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/40 backdrop-blur-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">সেবা নির্বাচন</h3>
                  <p className="text-sm text-gray-600">উপরের যেকোনো একটি সেবা বেছে নিন</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Video Tutorial Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">ভিডিও টিউটোরিয়াল</h2>
            <p className="text-gray-600">এআই টুল ব্যবহারের বিস্তারিত দেখুন</p>
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
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600">{tutorial.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Navigation - Mobile Only */}
 <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white to-slate-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200 px-2 py-2 flex justify-around">
  {[
    { path: '/home_page', icon: '🏠', text: 'হোম' },
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

export default AiMl;
