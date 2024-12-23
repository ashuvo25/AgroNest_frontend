import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { termsAndConditions, privacyPolicy, faq, logoutConfirmation } from './Terms';
import { ContentModal, ConfirmationModal } from './Modals';

interface UserStats {
  coursesCompleted: number;
  certificatesEarned: number;
  articlesWritten: number;
  followersCount: number;
}

interface Achievement {
  icon: string;
  title: string;
  description: string;
  date: string;
}

interface EditProfileForm {
  username: string;
  email: string;
  password: string;
  profilePicture: File | null;
}

const StatsCard: React.FC<{ 
  label: string; 
  value: number; 
  icon: string;
  type?: 'courses' | 'certificates' | 'articles' | 'followers';
}> = ({ label, value, icon, type = 'courses' }) => {
  const getColorScheme = () => {
    switch (type) {
      case 'courses':
        return {
          bg: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
          border: 'border-blue-200',
          text: 'text-blue-700',
          icon: 'bg-blue-100'
        };
      case 'certificates':
        return {
          bg: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5',
          border: 'border-purple-200',
          text: 'text-purple-700',
          icon: 'bg-purple-100'
        };
      case 'articles':
        return {
          bg: 'bg-gradient-to-br from-green-500/10 to-green-600/5',
          border: 'border-green-200',
          text: 'text-green-700',
          icon: 'bg-green-100'
        };
      case 'followers':
        return {
          bg: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5',
          border: 'border-orange-200',
          text: 'text-orange-700',
          icon: 'bg-orange-100'
        };
      default:
        return {
          bg: 'bg-white/90',
          border: 'border-gray-200',
          text: 'text-gray-700',
          icon: 'bg-gray-100'
        };
    }
  };

  const colors = getColorScheme();

  return (
    <div className={`${colors.bg} backdrop-blur-sm rounded-xl p-4 shadow-md border ${colors.border} hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.icon} shadow-sm`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-700">{label}</h3>
          <p className={`text-lg font-bold ${colors.text}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

const AchievementCard: React.FC<Achievement> = ({ icon, title, description, date }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-green-100/50">
    <div className="flex gap-3">
      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        <p className="text-[11px] text-green-600 mt-2">{date}</p>
      </div>
    </div>
  </div>
);

const MenuSection: React.FC<{ 
  onSettingsClick: () => void,
  onLogout: () => void
}> = ({ onSettingsClick, onLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<string | null>(null);

  const handleMenuClick = (type: string) => {
    setShowModal(type);
  };

  const renderModal = () => {
    switch(showModal) {
      case 'terms':
        return (
          <ContentModal
            title={termsAndConditions.title}
            content={termsAndConditions}
            onClose={() => setShowModal(null)}
          />
        );
      case 'privacy':
        return (
          <ContentModal
            title={privacyPolicy.title}
            content={privacyPolicy}
            onClose={() => setShowModal(null)}
          />
        );
      case 'faq':
        return (
          <ContentModal
            title={faq.title}
            content={faq}
            onClose={() => setShowModal(null)}
          />
        );
      case 'logout':
        return (
          <ConfirmationModal
            {...logoutConfirmation}
            onConfirm={onLogout}
            onCancel={() => setShowModal(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4"> {/* Changed from space-y-6 to space-y-4 */}
      {/* Main Features */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 px-1">মূল ফিচারসমূহ</h2>
        <div className="bg-gradient-to-br from-white to-gray-50/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-gray-200">
          {[
            { 
              icon: '🎓', 
              label: 'শিক্ষা', 
              badge: 'প্রদান, প্রাপ্ত, সার্টিফিকেট', 
              color: 'bg-purple-100 text-purple-700',
              onClick: () => navigate('/learning')
            },
            { 
              icon: '✍️', 
              label: 'ব্লগসমূহ', 
              badge: 'লিখুন, পড়ুন, ', 
              color: 'bg-green-100 text-green-700',
              onClick: () => navigate('/blog')
            },
            { 
              icon: '✍️', 
              label: 'কৃষি তথ্য ডেস্ক', 
              badge: 'তথ্য জানুন ,পড়ুন ', 
              color: 'bg-yellow-100 text-yellow-700',
              onClick: () => navigate('/infodesk')
            },
            { icon: '🔬', label: 'রোগ নির্ণয়', badge: 'ML', color: 'bg-orange-100 text-orange-700' },
            { icon: '🤖', label: 'মেশিন টিচার', badge: 'AI', color: 'bg-indigo-100 text-indigo-700' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.color}`}>
                  {item.badge}
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Support & Settings */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 px-1">সহায়তা ও সেটিংস</h2>
        <div className="bg-gradient-to-br from-white to-gray-50/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-gray-200">
          {[
            { icon: '📢', label: 'ইভেন্টসমূহ', color: 'bg-purple-100 text-purple-700', onClick: () => navigate('/event') },
            // { icon: '🛟', label: 'সহায়তা কেন্দ্র', onClick: () => {} },
            { icon: '⚙️', label: 'সেটিংস', onClick: onSettingsClick },
            { icon: '🔒', label: 'গোপনীয়তা নীতি', onClick: () => handleMenuClick('privacy') },
            { icon: '📜', label: 'শর্তাবলী', onClick: () => handleMenuClick('terms') },
            { icon: '❓', label: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', onClick: () => handleMenuClick('faq') },
            { icon: '📤', label: 'লগআউট', onClick: () => handleMenuClick('logout') },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {renderModal()}
      <div className="text-center mt-4 mb-2"> {/* Added mb-2 and changed mt-8 to mt-4 */}
        <p className="text-xs text-gray-400">AgroNest v1.0.0</p>
      </div>
    </div>
  );
};

const EditProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: Partial<EditProfileForm>) => void;
  currentUsername: string;
}> = ({ isOpen, onClose, onUpdate, currentUsername }) => {
  const [formData, setFormData] = useState<EditProfileForm>({
    username: currentUsername,
    email: '',
    password: '',
    profilePicture: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only include fields that have been modified
    const updates: Partial<EditProfileForm> = {};
    if (formData.username !== currentUsername) updates.username = formData.username;
    if (formData.email) updates.email = formData.email;
    if (formData.password) updates.password = formData.password;
    if (formData.profilePicture) updates.profilePicture = formData.profilePicture;

    onUpdate(updates);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, profilePicture: e.target.files![0] }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-green-100 rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">প্রোফাইল সম্পাদনা</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              প্রোফাইল ছবি
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ব্যবহারকারীর নাম
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="নতুন ইমেইল (ঐচ্ছিক)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="নতুন পাসওয়ার্ড (ঐচ্ছিক)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              আপডেট
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add handleLogout function
  const handleLogout = () => {
    // Clear any stored auth tokens or user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to sign-in page
    navigate('/signin');
  };

  const userStats: UserStats = {
    coursesCompleted: 12,
    certificatesEarned: 8,
    articlesWritten: 5,
    followersCount: 124
  };


  const handleUpdateProfile = (data: Partial<EditProfileForm>) => {
    console.log('Profile update data:', data);
    // Here you would typically make an API call to update the profile
    // For now, we'll just log the data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/90 via-white to-green-50/50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-100 backdrop-blur-lg border-b border-green-700/20 z-40">
        <div className="container mx-auto px-4 h-14">
          <div className="flex items-center justify-between h-full">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-green-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg> 
            </button>
            {/* <h1 className="text-base font-semibold text-green-800">প্রোফাইল</h1> */}
            <div className="flex items-center gap-2">
              <div className="text-right mr-2">
                <h2 className="text-sm font-medium text-green-800">কৃষক আহমেদ</h2>
                <p className="text-xs text-green-600">জৈব কৃষি বিশেষজ্ঞ</p>
              </div>
              <img
                src="src\assets\farmer.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-lg object-cover border border-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-6 md:pb-4 max-w-2xl"> {/* Changed pb-24 to pb-6 and md:pb-8 to md:pb-4 */}
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatsCard 
            label="কোর্স" 
            value={userStats.coursesCompleted} 
            icon="📚" 
            type="courses"
          />
          <StatsCard 
            label="সার্টিফিকেট" 
            value={userStats.certificatesEarned} 
            icon="🎓" 
            type="certificates"
          />
          <StatsCard 
            label="নিবন্ধ লেখা" 
            value={userStats.articlesWritten} 
            icon="✍️" 
            type="articles"
          />
          <StatsCard 
            label="অনুসারী" 
            value={userStats.followersCount} 
            icon="👥" 
            type="followers"          />        </div>        {/* Replace Achievements with Menu Section */}        <MenuSection onSettingsClick={() => setIsEditModalOpen(true)} onLogout={handleLogout} />      </main>      <EditProfileModal        isOpen={isEditModalOpen}        onClose={() => setIsEditModalOpen(false)}        onUpdate={handleUpdateProfile}        currentUsername="কৃষক আহমেদ"      />    </div>  );};export default ProfilePage;