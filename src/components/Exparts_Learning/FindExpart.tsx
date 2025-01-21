import React, { useState } from 'react';
import { Search, Filter, Star, MessageCircle, Phone, Calendar, ChevronRight, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = 'https://xsgames.co/randomusers/assets/avatars/placeholder.jpg';

const ExpertFinder = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState('সকল');
  const [searchQuery, setSearchQuery] = useState('');

  const expertiseCategories = [
    'সকল',
    'ফসল বিশেষজ্ঞ',
    'মাটি বিশেষজ্ঞ',
    'সেচ বিশেষজ্ঞ',
    'জৈব চাষ',
    'কীটপতঙ্গ নিয়ন্ত্রণ'
  ];
  
const experts = [
    {
        name: "ড. মাইকেল থম্পসন",
        specialty: "সিনিয়র ফসল বিশেষজ্ঞ",
        expertise: ["গম চাষ", "ভুট্টা চাষ", "ফসলের রোগ", "কীটপতঙ্গ নিয়ন্ত্রণ"],
        rating: "৪.৯",
        reviews: "১২৮",
        experience: "১৫+ বছর",
        available: "আজ",
        zone: "পশ্চিম",
        image: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
    },
    {
        name: "ড. সারাহ উইলসন",
        specialty: "মাটি ও সেচ বিশেষজ্ঞ",
        expertise: ["মাটি পরীক্ষা", "সেচ ব্যবস্থা", "পানি ব্যবস্থাপনা", "মাটির উর্বরতা"],
        rating: "৪.৮", 
        reviews: "৯৬",
        experience: "১২+ বছর",
        available: "আগামীকাল",
        zone: "দক্ষিণ",
        image: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg"
    },
    {
        name: "প্রফেসর জেমস চেন",
        specialty: "জৈব চাষ বিশেষজ্ঞ",
        expertise: ["জৈব চাষাবাদ", "টেকসই কৃষি", "কম্পোস্ট", "ফসল পর্যায়ক্রম"],
        rating: "৪.৯",
        reviews: "১৫৬",
        experience: "১৮+ বছর", 
        available: "আজ",
        zone: "পশ্চিম",
        image: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg"
    },
    {
        name: "ড. রাফি আহমেদ",
        specialty: "কৃষি প্রযুক্তি বিশেষজ্ঞ",
        expertise: ["ড্রোন প্রযুক্তি", "স্মার্ট কৃষি", "সেন্সর ব্যবস্থাপনা", "স্বয়ংক্রিয় সেচ"],
        rating: "৪.৭",
        reviews: "১১২",
        experience: "১০+ বছর",
        available: "আগামীকাল",
        zone: "উত্তর",
        image: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
    },
    {
        name: "ড. নাজমা বেগম",
        specialty: "বীজ ও উদ্ভিদ প্রজনন বিশেষজ্ঞ",
        expertise: ["বীজ উৎপাদন", "জাত উন্নয়ন", "বীজ সংরক্ষণ", "ফসল প্রজনন"],
        rating: "৪.৮",
        reviews: "১৩৫",
        experience: "১৬+ বছর",
        available: "আজ", 
        zone: "পূর্ব",
        image: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg"
    },
    {
        name: "ড. করিম চৌধুরী",
        specialty: "খাদ্য প্রক্রিয়াজাতকরণ বিশেষজ্ঞ",
        expertise: ["খাদ্য সংরক্ষণ", "প্যাকেজিং", "মান নিয়ন্ত্রণ", "খাদ্য নিরাপত্তা"],
        rating: "৪.৯",
        reviews: "১৪২",
        experience: "১৪+ বছর",
        available: "আজ",
        zone: "মধ্য",
        image: "https://xsgames.co/randomusers/assets/avatars/male/6.jpg"
    }
];

  const filteredExperts = experts
    .filter(expert => 
      selectedExpertise === 'সকল' || 
      expert.expertise.some(skill => 
        skill.includes(selectedExpertise)
      ) ||
      expert.specialty.includes(selectedExpertise)
    )
    .filter(expert => 
      searchQuery === '' || 
      expert.expertise.some(skill => 
        skill.includes(searchQuery)
      ) ||
      expert.specialty.includes(searchQuery)
    );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-emerald-100">
        <div className="max-w-md mx-auto px-4 py-4"> {/* Increased from py-2 to py-4 */}
          <div className="flex justify-between items-center mb-4"> {/* Increased from mb-2 to mb-4 */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-700">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-emerald-900">কৃষি বিশেষজ্ঞ খুঁজুন</h1>
            </div>
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {showFilter && (
            <div className="mb-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100"> {/* Increased padding */}
              <h3 className="text-sm font-medium text-emerald-900 mb-2">বিশেষজ্ঞতা নির্বাচন করুন</h3>
              <div className="flex flex-wrap gap-2">
                {expertiseCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedExpertise(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedExpertise === category 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বিশেষজ্ঞতা অনুসারে খুঁজুন (যেমন: মাটি পরীক্ষা, ফসলের রোগ)..."
              className="w-full py-2 px-4 pr-12 rounded-xl bg-white shadow-sm border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" // Reduced py-3 to py-2
            />
            <Search className="absolute right-4 top-2.5 text-emerald-600 w-5 h-5" /> {/* Adjusted positioning */}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto pt-[180px]"> {/* Increased from pt-[150px] to pt-[180px] */}
        <div className="max-w-md mx-auto px-4 pb-6">
          <div className="space-y-4">
            {filteredExperts.map((expert, index) => (
              <ExpertCard key={index} {...expert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExpertCardProps {
  name: string;
  specialty: string;
  expertise: string[];
  rating: string;
  reviews: string;
  experience: string;
  available: string;
  image: string;
}

const ExpertCard = ({ name, specialty, expertise, rating, reviews, experience, available, image }: ExpertCardProps) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handleExpertClick = () => {
    navigate('/expartprof'); // Assuming '/expert-details' is the route for exparts.tsx
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-200 overflow-hidden h-[200px]">
      <div className="flex h-full">
        <div className="w-32 h-full flex-shrink-0">
          <img
            src={imgError ? DEFAULT_AVATAR : image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
        
        <div className="flex-1 min-w-0 p-4 flex flex-col">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-emerald-900 text-lg">{name}</h3>
                <p className="text-xs text-emerald-600">{specialty}</p>
              </div>
              <span className="flex items-center text-sm bg-emerald-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                {rating}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {expertise.slice(0, 3).map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-emerald-700">
              <span className="font-medium">{experience}</span>
              <span className="text-emerald-300">•</span>
              <span>{reviews} রিভিউ</span>
            </div>
          </div>

          <div className="mt-auto pt-3 flex items-center justify-between border-t border-emerald-50">
            {/* <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full ">
              Available {available}
            </span> */}
            <div className="flex gap-1.5">
              <button className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors hover:text-emerald-700 group">
              <span className="block text-center">
                <img 
                  src="/src/assets/icons/chat.png" 
                  alt="মেসেজ" 
                className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform"
                />
                {/* <span className="text-xs text-emerald-900">কল</span> */}
              </span>
              </button>
              <button className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors hover:text-emerald-700 group">
              <span className="block text-center">
                <img 
                  src="/src/assets/icons/phone.png"
                  alt="কল" 
                className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform"
                />
                {/* <span className="text-xs text-emerald-900">কল</span> */}
              </span>
              </button>
              <button className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors hover:text-emerald-700 group">
              <span className="block text-center">
                <img 
                  src="/src/assets/icons/scadule.png"
                  alt="শিডিউল" 
                className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform"
                />
                {/* <span className="text-xs text-emerald-900">কল</span> */}
              </span>
              </button>
              <button 
                onClick={handleExpertClick}
                className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-all text-white hover:shadow-lg hover:shadow-emerald-100 group hover:scale-105"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertFinder;