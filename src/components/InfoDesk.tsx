import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  title: string;
  description: string;
  date: string;
  source: string;
  link?: string;
  image?: string;
}

const NewsCard: React.FC<NewsItem> = ({ title, description, date, source, link, image }) => (
  <div className="bg-white rounded-md shadow-sm hover:shadow transition-shadow duration-200">
    {image && (
      <img src={image} alt={title} className="w-full h-20 object-cover rounded-t-md" />
    )}
    <div className="p-2">
      <h3 className="font-medium text-xs text-gray-800 mb-0.5 line-clamp-1">{title}</h3>
      <p className="text-gray-600 text-[10px] mb-1 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center text-[9px] text-gray-500">
        <span>{date}</span>
        <span className="text-green-600">{source}</span>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-green-600 hover:text-green-700 text-[9px] font-medium"
        >
          বিস্তারিত →
        </a>
      )}
    </div>
  </div>
);

const NewsSectionHeader: React.FC<{ 
  title: string; 
  icon: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ title, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 min-w-[100px] md:min-w-0 md:flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md transition-all duration-200 ${
      isActive 
        ? 'bg-green-700 text-white shadow-sm' 
        : 'bg-white text-gray-700 hover:bg-green-50'
    }`}
  >
    <span className="text-base">{icon}</span>
    <h2 className="text-[11px] font-medium whitespace-nowrap">{title}</h2>
  </button>
);

const InformationDesk: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'gov' | 'bank' | 'general'>('gov');

  const govNews: NewsItem[] = [
    {
      title: "কৃষি ভর্তুকি বৃদ্ধি ২০২৪",
      description: "সরকার কৃষকদের জন্য নতুন ভর্তুকি প্রকল্প ঘোষণা করেছে যা আগামী বছর থেকে কার্যকর হবে।",
      date: "২০ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/farmer.jpg",
      link: "#"
    },
    {
      title: "নতুন কৃষি নীতিমালা প্রণয়ন",
      description: "সরকার কৃষকদের স্বার্থে নতুন কৃষি নীতিমালা প্রণয়ন করেছে।",
      date: "১৮ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/smart-farming.jpg",
      link: "#"
    },
    {
      title: "কৃষি যন্ত্রপাতির ভর্তুকি বৃদ্ধি",
      description: "আধুনিক কৃষি যন্ত্রপাতি ক্রয়ে সরকারি ভর্তুকি ৫০% বৃদ্ধি করা হয়েছে।",
      date: "১৫ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/gov-news3.jpg",
      link: "#"
    },
  ];

  const bankNews: NewsItem[] = [
    {
      title: "কৃষি ঋণের সুদের হার কমলো",
      description: "বাংলাদেশ ব্যাংক কৃষি ঋণের সুদের হার কমিয়ে ৮% করেছে।",
      date: "১৮ মার্চ ২০২৪",
      source: "বাংলাদেশ ব্যাংক",
      image: "src/assets/bank-news.jpg",
      link: "#"
    },
    {
      title: "কৃষি ঋণ প্রক্রিয়া সহজীকরণ",
      description: "কৃষকদের জন্য ঋণ প্রাপ্তির প্রক্রিয়া আরও সহজ করা হয়েছে।",
      date: "১৬ মার্চ ২০২৪",
      source: "কৃষি ব্যাংক",
      image: "src/assets/bank-news2.jpg",
      link: "#"
    },
    {
      title: "বীমা সহায়তা প্রকল্প",
      description: "কৃষি ঋণের সাথে বীমা সুবিধা যুক্ত করা হয়েছে।",
      date: "১৪ মার্চ ২০২৪",
      source: "বীমা কর্তৃপক্ষ",
      image: "src/assets/bank-news3.jpg",
      link: "#"
    },
  ];

  const generalNews: NewsItem[] = [
    {
      title: "নতুন ধানের জাত উন্মোচন",
      description: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট নতুন ধানের জাত উন্মোচন করেছে।",
      date: "১৫ মার্চ ২০২৪",
      source: "কৃষি গবেষণা কেন্দ্র",
      image: "src/assets/general-news.jpg",
      link: "#"
    },
    {
      title: "আবহাওয়া পূর্বাভাস",
      description: "আগামী সপ্তাহে বৃষ্টিপাতের সম্ভাবনা রয়েছে।",
      date: "১৪ মার্চ ২০২৪",
      source: "আবহাওয়া অধিদপ্তর",
      image: "src/assets/weather-news.jpg",
      link: "#"
    },
    {
      title: "কৃষি মেলার আয়োজন",
      description: "রাজধানীতে তিন দিনব্যাপী কৃষি মেলার আয়োজন করা হয়েছে।",
      date: "১২ মার্চ ২০২৪",
      source: "কৃষি সম্প্রসারণ",
      image: "src/assets/fair-news.jpg",
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white py-2">
        <div className="container mx-auto px-3">
          <div className="flex items-center gap-3 mb-1">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-semibold flex items-center gap-1.5">
              <span>📰</span> কৃষি তথ্য ডেস্ক
            </h1>
          </div>
          <p className="text-[11px] text-green-100 ml-9">সর্বশেষ কৃষি সংক্রান্ত খবর ও তথ্য</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 py-3">
        {/* Section Buttons Row - Scrollable on mobile */}
        <div className="mb-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1.5">
            <NewsSectionHeader 
              title="সরকারি সংবাদ" 
              icon="🏛️" 
              isActive={activeSection === 'gov'}
              onClick={() => setActiveSection('gov')}
            />
            <NewsSectionHeader 
              title="ব্যাংক সংবাদ" 
              icon="🏦" 
              isActive={activeSection === 'bank'}
              onClick={() => setActiveSection('bank')}
            />
            <NewsSectionHeader 
              title="সাধারণ সংবাদ" 
              icon="📰" 
              isActive={activeSection === 'general'}
              onClick={() => setActiveSection('general')}
            />
          </div>
        </div>

        {/* News Content - Grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {activeSection === 'gov' && govNews.map((news, index) => (
            <NewsCard key={`gov-${index}`} {...news} />
          ))}
          {activeSection === 'bank' && bankNews.map((news, index) => (
            <NewsCard key={`bank-${index}`} {...news} />
          ))}
          {activeSection === 'general' && generalNews.map((news, index) => (
            <NewsCard key={`general-${index}`} {...news} />
          ))}
        </div>
      </main>

      {/* Responsive Footer */}
      <footer className="bg-white border-t border-gray-100 py-2">
        <div className="container mx-auto px-3 text-center">
          <p className="text-[10px] text-gray-500">
            সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InformationDesk;
