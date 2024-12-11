import React from "react";

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  rating: number;
  image: string;
  category?: string;
  progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  duration,
  lessons,
  rating,
  image,
  category,
  progress = 0,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-56 min-w-[280px] relative group">
      {/* Add category badge */}
      {category && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      )}
      
      <div className="aspect-video relative overflow-hidden rounded-t-xl h-32">
        {/* Add overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/90 hover:bg-white text-green-700 px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            কোর্স দেখুন
          </button>
        </div>
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        
      </div>
      
      {/* Add progress bar if progress exists */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      <div className="p-3"> {/* Increased padding */}
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">{title}</h3> {/* Changed line-clamp-1 to line-clamp-2 */}
        <p className="text-green-600 text-xs mb-1">{instructor}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span>🕒</span> {duration}
          </span>
          <span className="flex items-center gap-1">
                      <span>📚</span> {lessons} Lessons
          </span>
          <span className="flex items-center gap-1">
                <span className="text-[#2C5F2D] font-bold text-xs md:text-sm">★ {rating}</span>
          </span>
          
         
        </div>
      </div>
    </div>
  );
};

const LearningPage: React.FC = () => {
  const categories = [
    "ফসল ব্যবস্থাপনা",
    "পশুপালন",
    "জৈব কৃষি",
    "স্মার্ট কৃষি",
    "মৃত্তিকা বিজ্ঞান",
    "টেকসই চাষাবাদ",
    "কৃষি যন্ত্রপাতি",
    "কৃষি অর্থনীতি"
  ];

  const userProgress = {
    coursesCompleted: 12,
    totalHours: 48,
    currentStreak: 5
  };

  const HeaderProgressSection = () => (
    <div className="hidden md:flex items-center gap-8 px-6 py-3 bg-white/10 rounded-lg">
      <div className="text-center">
        <p className="text-white/80 text-xs">সম্পন্ন কোর্স</p>
        <p className="text-white font-bold">{userProgress.coursesCompleted}</p>
      </div>
      <div className="text-center">
        <p className="text-white/80 text-xs">মোট সময়</p>
        <p className="text-white font-bold">{userProgress.totalHours}h</p>
      </div>
      <div className="text-center">
        <p className="text-white/80 text-xs">বর্তমান স্ট্রিক</p>
        <p className="text-white font-bold">🔥 {userProgress.currentStreak} দিন</p>
      </div>
    </div>
  );

  const courses = [
    {
      title: "আধুনিক জৈব চাষাবাদ পদ্ধতি",
      instructor: "ড. সারা রহমান",
      duration: "১০ঘ ৩০মি",
      lessons: 32,
      rating: 4.9,
      image: "src/assets/rice-field.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "টেকসই ফসল ব্যবস্থাপনা",
      instructor: "প্রফেসর মোস্তাফিজুর রহমান",
      duration: "৮ঘ ৪৫মি",
      lessons: 24,
      rating: 4.8,
      image: "src/assets/smart-farming.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "স্মার্ট সেচ ব্যবস্থা",
      instructor: "ইঞ্জি. আব্দুল করিম",
      duration: "৬ঘ ১৫মি",
      lessons: 18,
      rating: 4.7,
      image: "src/assets/vegetable-garden.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
  ];

  const recommendedCourses = [
    {
      title: "নির্ভুল কৃষি প্রযুক্তি",
      instructor: "ড. নাজমুল হক",
      duration: "৫ঘ ১৫মি",
      lessons: 15,
      rating: 4.9,
      image: "src/assets/vegetable-garden.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "গ্রীনহাউস ব্যবস্থাপনা",
      instructor: "প্রফেসর জামাল উদ্দিন",
      duration: "৭ঘ ২০মি",
      lessons: 22,
      rating: 4.8,
      image: "src/assets/vegetable-garden.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "Hydroponics Farming",
      instructor: "Dr. Lisa Zhang",
      duration: "6h 45m",
      lessons: 20,
      rating: 4.9,
      image: "src/assets/vegetable-garden.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "Pest Management Strategies",
      instructor: "Prof. Robert Brown",
      duration: "4h 30m",
      lessons: 16,
      rating: 4.7,
      image: "src/assets/vegetable-garden.jpg",
      category: "জৈব কৃষি",
      progress: 65,
    },
    {
      title: "Agricultural Marketing",
      instructor: "Mary Anderson",
      duration: "5h 00m",
      lessons: 18,
      rating: 4.6,
      image: "src/assets/vegetable-garden.jpg",
    },
    {
      title: "Soil Fertility Management",
      instructor: "Dr. Tom Harris",
      duration: "8h 15m",
      lessons: 24,
      rating: 4.8,
      image: "src/assets/vegetable-garden.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-[#E8F3E8]"> {/* Light blue background */}
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#D1E7D1]">
        <div className="p-4 border-b border-[#D1E7D1]">
          <h1 className="text-xl font-bold text-[#2C5F2D] flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            এগ্রোনেস্ট
          </h1>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          {[
            { icon: '🏠', label: 'হোম', active: true },
            { icon: '✨', label: 'কোর্স' },
            { icon: '🌿', label: 'লাইব্রেরি' },
            { icon: '👤', label: 'প্রোফাইল' },
            { icon: '⚙️', label: 'সেটিংস' },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                item.active 
                  ? 'bg-[#e8f3e800] text-[#2C5F2D]' 
                  : 'text-gray-600 hover:bg-[#E8F3E8] hover:text-[#2C5F2D]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-gradient-to-r from-green-800 via-green-700 to-green-600 border-b border-green-900/10 z-40">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <img
                src="https://source.unsplash.com/featured/?farmer"
                alt="প্রোফাইল"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <h2 className="font-semibold text-white">স্বাগতম, কৃষক আহমেদ</h2>
                <p className="text-sm text-green-100/80">শিখতে প্রস্তুত?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-full text-white">
                <span className="text-xl">🔔</span>
              </button>
            </div>
            <HeaderProgressSection />
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 px-4 md:px-6 lg:px-8 pb-20 lg:pb-8">
          {/* Search and Categories */}
          <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-6 mb-8">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="কৃষি কোর্স খুঁজুন..."
                  className="w-full p-4 pr-12 text-sm md:text-base rounded-xl border border-[#D1E7D1] focus:border-[#2C5F2D] focus:ring-1 focus:ring-[#2C5F2D]/20"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  🔍
                </button>
              </div>

              <div className="flex flex-wrap gap-2 overflow-x-auto">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-full bg-white border border-[#D1E7D1] text-sm hover:bg-[#E8F3E8] hover:border-[#2C5F2D] transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2C5F2D]/10 to-[#2C5F2D]/5 rounded-xl p-6 hidden lg:block">
              <h3 className="font-semibold mb-2 text-[#2C5F2D]">শিক্ষার অগ্রগতি</h3>
              <p className="text-sm text-gray-600">আপনার শেষ অবস্থান ��েকে শুরু করুন...</p>
            </div>
          </div>

          {/* Course Grid */}
          <div className="max-w-screen-2xl mx-auto space-y-8">
            {/* Featured Courses */}
            <section>
              <h2 className="text-xl font-bold mb-4">বৈশিষ্ট্যযুক্ত কোর্সসমূহ</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"> {/* Added padding and negative margin for full-width scroll */}
                {courses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            </section>

            {/* Recommended Courses */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">আপনার জন্য সুপারিশকৃত</h2>
                <button className="text-green-600 hover:text-green-700">সব দেখুন →</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {recommendedCourses.map((course, index) => (
                  <CourseCard key={`rec-${index}`} {...course} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#D1E7D1] shadow-lg z-50 md:hidden">
        <nav className="container mx-auto flex justify-around py-2 max-w-6xl">
          {[
            { icon: '🏠', label: 'হোম', active: true },
            { icon: '✨', label: 'অনুসন্ধান' },
            { icon: '🌿', label: 'গ্যালারি' },
            { icon: '⚙️', label: 'সেটিংস' },
          ].map((item, index) => (
            <button 
              key={index} 
              className={`flex flex-col items-center group px-3 py-1 rounded-lg
                       ${item.active ? 'bg-[#E8F3E8]' : 'hover:bg-[#E8F3E8]/50'}`}
            >
              <div className="text-base group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${
                item.active ? 'text-[#2C5F2D]' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default LearningPage;