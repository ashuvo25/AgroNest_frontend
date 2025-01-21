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

// Top Navigation Bar Component
const TopBar: React.FC = () => (
  <div className="md:hidden flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <span className="text-2xl">🌾</span>
      <h1 className="text-xl font-bold text-[#2C5F2D]">এগ্রোনেস্ট</h1>
    </div>
    <button className="p-2 hover:bg-white/10 rounded-full text-[#2C5F2D]">
      <span className="text-xl">🔔</span>
    </button>
  </div>
);

// Search Bar Component
const SearchBar: React.FC = () => (
  <div className="relative lg:hidden">
    <input
      type="text"
      placeholder="কৃষি কোর্স খুঁজুন..."
      className="w-full p-4 pr-12 text-sm md:text-base rounded-xl border border-[#D1E7D1] focus:border-[#2C5F2D] focus:ring-1 focus:ring-[#2C5F2D]/20"
    />
    <button className="absolute right-4 top-1/2 -translate-y-1/2">
      🔍
    </button>
  </div>
);

// Categories Component
const CategoryList: React.FC<{ categories: string[] }> = ({ categories }) => (
  <div className="flex flex-wrap gap-2 overflow-x-auto">
    {categories.map((category, index) => (
      <button
        key={index}
        className="px-3 py-1.5 rounded-full bg-white border border-[#D1E7D1] text-xs hover:bg-[#E8F3E8] hover:border-[#2C5F2D] transition-colors"
      >
        {category}
      </button>
    ))}
  </div>
);

// Progress Card Component
const ProgressCard: React.FC = () => (
  <div className="bg-gradient-to-br from-[#2C5F2D]/10 to-[#2C5F2D]/5 rounded-xl p-6 hidden lg:block">
    <h3 className="font-semibold mb-2 text-[#2C5F2D]">শিক্ষার অগ্রগতি</h3>
    <p className="text-sm text-gray-600">আপনার শেষ অবস্থান কে শুরু করুন...</p>
  </div>
);

// Course Section Component
const CourseSection: React.FC<{ title: string; courses: any[]; showViewAll?: boolean }> = ({ 
  title, 
  courses,
  showViewAll = false 
}) => (
  <section>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {showViewAll && (
        <button className="text-green-600 hover:text-green-700">সব দেখুন →</button>
      )}
    </div>
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {courses.map((course, index) => (
        <CourseCard key={`${title}-${index}`} {...course} />
      ))}
    </div>
  </section>
);

// Bottom Navigation Component
const BottomNav: React.FC = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 px-2 py-1.5 flex justify-around">
      <button onClick={() => handleNavigation('/home_page')} className="text-green-700 flex flex-col items-center">
        <span className="text-2xl">🏠</span>
        <span className="text-[10px] mt-0.5">হোম</span>
      </button>
      <button onClick={() => handleNavigation('/marketplace')} className="text-gray-600 flex flex-col items-center">
        <span className="text-2xl">🏪</span>
        <span className="text-[10px] mt-0.5">মার্কেট</span>
      </button>
      <button onClick={() => handleNavigation('/ai_ml')} className="text-gray-600 flex flex-col items-center">
        <span className="text-2xl">🤖</span>
        <span className="text-[10px] mt-0.5">AI/ML</span>
      </button>
      <button onClick={() => handleNavigation('/rent')} className="text-gray-600 flex flex-col items-center">
        <span className="text-2xl">🚜</span>
        <span className="text-[10px] mt-0.5">ভাড়া করুন</span>
      </button>
      <button onClick={() => handleNavigation('/profile')} className="text-gray-600 flex flex-col items-center">
        <span className="text-2xl">👤</span>
        <span className="text-[10px] mt-0.5">প্রোফাইল</span>
      </button>
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
    <div className="min-h-screen bg-[#E8F3E8]">
      <main className="px-4 md:px-6 lg:px-8 pb-20 lg:pb-8 pt-4">
        <TopBar />
        
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-6 mb-8">
          <div className="space-y-6">
            <SearchBar />
            <CategoryList categories={categories} />
          </div>
          <ProgressCard />
        </div>

        <div className="max-w-screen-2xl mx-auto space-y-8">
          <CourseSection title="বৈশিষ্ট্যযুক্ত কোর্সসমূহ" courses={courses} />
          <CourseSection 
            title="আপনার জন্য সুপারিশকৃত" 
            courses={recommendedCourses} 
            showViewAll={true}
          />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default LearningPage;