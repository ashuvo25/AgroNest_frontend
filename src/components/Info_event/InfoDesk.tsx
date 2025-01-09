import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Main Entities
interface NewsItem {
  title: string;      // News headline
  description: string; // Full news content
  date: string;       // News date
  source: string;     // Source of news
  link?: string;      // Optional link (no longer needed as per latest changes)
  image?: string;     // Optional news image
  tags?: string[];    // Optional categorization tags
}

// Add new interface for modal state
interface ModalState {
  isOpen: boolean;    // Modal visibility state
  news: NewsItem | null; // Current news item in modal
}

// Component Props Interfaces
interface NewsSectionHeaderProps {
  title: string;      // Section title
  icon: string;       // Section icon
  isActive: boolean;  // Active state
  onClick: () => void; // Click handler
}

// News Categories (used in state)
type NewsSection = 'gov' | 'bank' | 'general';

// Update NewsModal component to show complete details
const NewsModal: React.FC<{
  news: NewsItem;
  onClose: () => void;
}> = ({ news, onClose }) => (
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
      {/* Close buttons - Two options for closing */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          title="বন্ধ করুন"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Add a cancel button at the bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-white/0">
        <button
          onClick={onClose}
          className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
            transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          বন্ধ করুন
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[90vh]">
        {/* Hero Image */}
        {news.image && (
          <div className="relative h-48 md:h-64">
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <span>{news.date}</span>
                <span>•</span>
                <span className="text-green-300">{news.source}</span>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{news.title}</h2>
          
          {/* Full Description */}
          <div className="prose prose-sm max-w-none text-gray-600">
            {news.description.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Update NewsCard component to handle click
const NewsCard: React.FC<NewsItem & { onClick: () => void }> = ({ onClick, ...news }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-md shadow-sm hover:shadow transition-shadow duration-200 cursor-pointer"
  >
    {news.image && (
      <img src={news.image} alt={news.title} className="w-full h-20 object-cover rounded-t-md" />
    )}
    <div className="p-2">
      <h3 className="font-medium text-xs text-gray-800 mb-0.5 line-clamp-1">{news.title}</h3>
      <p className="text-gray-600 text-[10px] mb-1 line-clamp-2">{news.description}</p>
      <div className="flex justify-between items-center text-[9px] text-gray-500">
        <span>{news.date}</span>
        <span className="text-green-600">{news.source}</span>
      </div>
      {news.link && (
        <a
          href={news.link}
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

const NewsSectionHeader: React.FC<NewsSectionHeaderProps> = ({ title, icon, isActive, onClick }) => (
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
  const [activeSection, setActiveSection] = useState<NewsSection>('gov');
  const [modal, setModal] = useState<ModalState>({ isOpen: false, news: null });

  // News Collections
  const govNews: NewsItem[] = [
    {
      title: "কৃষি ভর্তুকি বৃদ্ধি ২০২৪",
      description: `সরকার কৃষকদের জন্য নতুন ভর্তুকি প্রকল্প ঘোষণা করেছে যা আগামী বছর থেকে কার্যকর হবে।

কৃষি মন্ত্রণালয় আজ ২০২৪ সালের জন্য নতুন কৃষি ভর্তুকি প্রকল্পের ঘোষণা দিয়েছে। এই প্রকল্পের আওতায় কৃষকরা আগের তুলনায় ৩০% বেশি ভর্তুকি পাবেন।

প্রকল্পের প্রধান বৈশিষ্ট্যসমূহ:
১. সার ক্রয়ে ৫০% ভর্তুকি
২. কৃষি যন্ত্রপাতি ক্রয়ে ৪০% ভর্তুকি
৩. বীজ ক্রয়ে ৩৫% ভর্তুকি

এই প্রকল্পের মাধ্যমে কৃষকদের উৎপাদন খরচ কমবে এবং তারা আরও বেশি লাভবান হবেন।`,
      date: "২০ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/farmer.jpg",
      tags: ["ভর্তুকি", "কৃষি উন্নয়ন", "সরকারি প্রকল্প"],
      link: "#"
    },
    {
      title: "নতুন কৃষি নীতিমালা প্রণয়ন",
      description: `সরকার আজ নতুন কৃষি নীতিমালা প্রণয়ন করেছে যা কৃষকদের স্বার্থে কার্যকর হবে। এই নীতিমালার আওতায় কৃষকদের জন্য বিভিন্ন সুবিধা প্রদান করা হবে।

নীতিমালার প্রধান বৈশিষ্ট্যসমূহ:
১. কৃষি ঋণের সুদের হার কমানো
২. কৃষি যন্ত্রপাতির ভর্তুকি বৃদ্ধি
৩. কৃষি প্রশিক্ষণ ও গবেষণার জন্য বিশেষ তহবিল
      
এই নীতিমালার মাধ্যমে কৃষকদের জীবনযাত্রার মান উন্নত হবে এবং তারা আরও বেশি উৎপাদনশীল হবেন।`,
      date: "১৮ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/smart-farming.jpg",
      link: "#"
    },
    {
      title: "কৃষি যন্ত্রপাতির ভর্তুকি বৃদ্ধি",
      description: `সরকার আজ আধুনিক কৃষি যন্ত্রপাতি ক্রয়ে ভর্তুকি ৫০% বৃদ্ধি করার ঘোষণা দিয়েছে। এই ভর্তুকির মাধ্যমে কৃষকরা আরও উন্নত যন্ত্রপাতি ক্রয় করতে পারবেন।

ভর্তুকির প্রধান বৈশিষ্ট্যসমূহ:
১. ট্রাক্টর, হারভেস্টার, এবং অন্যান্য যন্ত্রপাতির জন্য ভর্তুকি
২. যন্ত্রপাতি ক্রয়ের জন্য সহজ ঋণ সুবিধা
৩. যন্ত্রপাতির রক্ষণাবেক্ষণের জন্য বিশেষ তহবিল
      
এই ভর্তুকির মাধ্যমে কৃষকদের উৎপাদন খরচ কমবে এবং তারা আরও বেশি লাভবান হবেন।`,
      date: "১৫ মার্চ ২০২৪",
      source: "কৃষি মন্ত্রণালয়",
      image: "src/assets/gov-news3.jpg",
      link: "#"
    },
  ];

  const bankNews: NewsItem[] = [
    {
      title: "কৃষি ঋণের সুদের হার কমলো",
      description: `বাংলাদেশ ব্যাংক আজ কৃষি ঋণের সুদের হার কমিয়ে ৮% করার ঘোষণা দিয়েছে। এই সিদ্ধান্তের ফলে কৃষকরা আরও সহজে ঋণ পেতে পারবেন।

ঋণের প্রধান বৈশিষ্ট্যসমূহ:
১. কম সুদের হার
২. সহজ ঋণ প্রক্রিয়া
৩. ঋণের জন্য বিশেষ তহবিল
      
এই সিদ্ধান্তের মাধ্যমে কৃষকদের উৎপাদন খরচ কমবে এবং তারা আরও বেশি লাভবান হবেন।`,
      date: "১৮ মার্চ ২০২৪",
      source: "বাংলাদেশ ব্যাংক",
      image: "src/assets/bank-news.jpg",
      link: "#"
    },
    {
      title: "কৃষি ঋণ প্রক্রিয়া সহজীকরণ",
      description: `কৃষি ব্যাংক আজ কৃষকদের জন্য ঋণ প্রাপ্তির প্রক্রিয়া আরও সহজ করার ঘোষণা দিয়েছে। এই সিদ্ধান্তের ফলে কৃষকরা আরও সহজে ঋণ পেতে পারবেন।

ঋণের প্রধান বৈশিষ্ট্যসমূহ:
১. কম সুদের হার
২. সহজ ঋণ প্রক্রিয়া
৩. ঋণের জন্য বিশেষ তহবিল
      
এই সিদ্ধান্তের মাধ্যমে কৃষকদের উৎপাদন খরচ কমবে এবং তারা আরও বেশি লাভবান হবেন।`,
      date: "১৬ মার্চ ২০২৪",
      source: "কৃষি ব্যাংক",
      image: "src/assets/bank-news2.jpg",
      link: "#"
    },
    {
      title: "বীমা সহায়তা প্রকল্প",
      description: `বীমা কর্তৃপক্ষ আজ কৃষি ঋণের সাথে বীমা সুবিধা যুক্ত করার ঘোষণা দিয়েছে। এই সিদ্ধান্তের ফলে কৃষকরা আরও সহজে ঋণ পেতে পারবেন।

ঋণের প্রধান বৈশিষ্ট্যসমূহ:
১. কম সুদের হার
২. সহজ ঋণ প্রক্রিয়া
৩. ঋণের জন্য বিশেষ তহবিল
      
এই সিদ্ধান্তের মাধ্যমে কৃষকদের উৎপাদন খরচ কমবে এবং তারা আরও বেশি লাভবান হবেন।`,
      date: "১৪ মার্চ ২০২৪",
      source: "বীমা কর্তৃপক্ষ",
      image: "src/assets/bank-news3.jpg",
      link: "#"
    },
  ];

  const generalNews: NewsItem[] = [
    {
      title: "নতুন ধানের জাত উন্মোচন",
      description: `বাংলাদেশ ধান গবেষণা ইনস্টিটিউট আজ নতুন ধানের জাত উন্মোচন করেছে। এই জাতের ধান উচ্চ ফলনশীল এবং রোগ প্রতিরোধী।

জাতের প্রধান বৈশিষ্ট্যসমূহ:
১. উচ্চ ফলনশীল
২. রোগ প্রতিরোধী
৩. স্বল্প সময়ে ফলন
      
এই জাতের ধান চাষ করে কৃষকরা আরও বেশি লাভবান হবেন।`,
      date: "১৫ মার্চ ২০২৪",
      source: "কৃষি গবেষণা কেন্দ্র",
      image: "src/assets/general-news.jpg",
      link: "#"
    },
    {
      title: "আবহাওয়া পূর্বাভাস",
      description: `আবহাওয়া অধিদপ্তর আজ আগামী সপ্তাহে বৃষ্টিপাতের সম্ভাবনা রয়েছে বলে পূর্বাভাস দিয়েছে।

পূর্বাভাসের প্রধান বৈশিষ্ট্যসমূহ:
১. বৃষ্টিপাতের সম্ভাবনা
২. তাপমাত্রা কমবে
৩. বাতাসের গতি বৃদ্ধি পাবে
      
এই পূর্বাভাসের মাধ্যমে কৃষকরা তাদের ফসলের সুরক্ষা নিশ্চিত করতে পারবেন।`,
      date: "১৪ মার্চ ২০২৪",
      source: "আবহাওয়া অধিদপ্তর",
      image: "src/assets/weather-news.jpg",
      link: "#"
    },
    {
      title: "কৃষি মেলার আয়োজন",
      description: `কৃষি সম্প্রসারণ আজ রাজধানীতে তিন দিনব্যাপী কৃষি মেলার আয়োজন করার ঘোষণা দিয়েছে। এই মেলায় কৃষকরা তাদের পণ্য প্রদর্শন করতে পারবেন।

মেলার প্রধান বৈশিষ্ট্যসমূহ:
১. কৃষি পণ্যের প্রদর্শনী
২. কৃষি যন্ত্রপাতির প্রদর্শনী
৩. কৃষি প্রশিক্ষণ ও কর্মশালা
      
এই মেলার মাধ্যমে কৃষকরা তাদের পণ্য বিক্রি করতে পারবেন এবং নতুন প্রযুক্তি সম্পর্কে জানতে পারবেন।`,
      date: "১২ মার্চ ২০২৪",
      source: "কৃষি সম্প্রসারণ",
      image: "src/assets/fair-news.jpg",
      link: "#"
    },
  ];

  // Add modal handlers
  const openModal = (news: NewsItem) => setModal({ isOpen: true, news });
  const closeModal = () => setModal({ isOpen: false, news: null });

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
            <NewsCard key={`gov-${index}`} {...news} onClick={() => openModal(news)} />
          ))}
          {activeSection === 'bank' && bankNews.map((news, index) => (
            <NewsCard key={`bank-${index}`} {...news} onClick={() => openModal(news)} />
          ))}
          {activeSection === 'general' && generalNews.map((news, index) => (
            <NewsCard key={`general-${index}`} {...news} onClick={() => openModal(news)} />
          ))}
        </div>
      </main>

      {/* Add Modal */}
      {modal.isOpen && modal.news && (
        <NewsModal news={modal.news} onClose={closeModal} />
      )}

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
