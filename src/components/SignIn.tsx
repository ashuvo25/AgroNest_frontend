import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoAccess = () => {
    navigate('/home_page');
  };

  return (
    <div className="h-screen overflow-hidden bg-[url('/assets/farm-bg.jpg')] bg-cover bg-center relative">
      {/* Updated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-800/95 to-teal-900/95 backdrop-blur-sm"></div>
      
      <div className="relative h-screen flex items-center justify-center px-4">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 h-full p-6 flex-col justify-center items-center text-white relative">
          {/* Add subtle glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"></div>
          <h1 className="text-5xl font-bold mb-4">AgriNest</h1>
          <p className="text-lg text-green-100 mb-6 text-center max-w-md">
            আপনার ডিজিটাল কৃষি সহায়ক
          </p>
          
          {/* Image Grid - Reduced size */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6 relative">
            <div className="aspect-square rounded-xl overflow-hidden relative group bg-emerald-900/30 backdrop-blur-sm">
              <img 
                src="src/assets/rice-field.jpg" 
                alt="Rice Field" 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-3">
                <span className="text-white text-sm font-medium">ধান চাষ</span>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden relative group bg-emerald-900/30 backdrop-blur-sm">
              <img 
                src="src/assets/vegetable-garden.jpg" 
                alt="Vegetable Garden" 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-3">
                <span className="text-white text-sm font-medium">সবজি চাষ</span>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden relative group bg-emerald-900/30 backdrop-blur-sm">
              <img 
                src="src/assets/smart-farming.jpg" 
                alt="Smart Farming" 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-3">
                <span className="text-white text-sm font-medium">স্মার্ট কৃষি</span>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden relative group bg-emerald-900/30 backdrop-blur-sm">
              <img 
                src="src/assets/farmer.jpg" 
                alt="Farmer" 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-3">
                <span className="text-white text-sm font-medium">কৃষক সহায়তা</span>
              </div>
            </div>
          </div>

          {/* Feature Cards - Reduced size */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md relative">
            <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 p-4 rounded-xl backdrop-blur-md hover:from-emerald-600/20 hover:to-teal-600/20 transition-all duration-300 border border-white/5">
              <h3 className="text-base font-semibold mb-1">২৪/৭ সহায়তা</h3>
              <p className="text-green-100 text-xs">সারা দিন আমাদের বিশেষজ্ঞদের সাথে যোগাযোগ করুন</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 p-4 rounded-xl backdrop-blur-md hover:from-emerald-600/20 hover:to-teal-600/20 transition-all duration-300 border border-white/5">
              <h3 className="text-base font-semibold mb-1">স্মার্ট কৃষি</h3>
              <p className="text-green-100 text-xs">আধুনিক প্রযুক্তি ব্যবহার করে কৃষি উন্নয়ন</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-sm lg:w-1/2 lg:max-w-md p-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-emerald-900/20 p-6 border border-white/40">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">প্রবেশ করুন</h2>
                <p className="text-xs text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form inputs with reduced spacing */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">ইমেইল অ্যাড্রেস</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="আপনার ইমেইল লিখুন"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                  />
                </div>
              </div>

              {/* Remember me and forgot password - Reduced spacing */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-3 h-3 text-green-600 rounded border-gray-300"/>
                  <span className="ml-2 text-xs text-gray-600">মনে রাখুন</span>
                </label>
                <a href="#" className="text-xs font-medium text-green-600 hover:text-green-700">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>

              {/* Submit button - Reduced height */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 rounded-lg text-sm font-medium transition-all duration-300"
              >
                প্রবেশ করুন
              </button>

              {/* Divider - Reduced margin */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">অথবা</span>
                </div>
              </div>

              {/* Google Sign In - Reduced height */}
              {/* <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.9c1.5 0 2.9.6 3.9 1.6l2.8-2.8C17.1 3.1 14.7 2 12 2 8.1 2 4.8 4.2 3.2 7.3l3.3 2.6c.8-2.2 2.9-3.9 5.5-3.9z"/>
                  <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.5c-.2 1.2-1 2.3-2 3v2.5h3.2c1.9-1.7 3-4.2 3-7.5z"/>
                  <path fill="#FBBC05" d="M6.5 13.9c-.2-.6-.3-1.2-.3-1.9 0-.7.1-1.3.3-1.9l-3.3-2.6C2.4 9 2 10.4 2 12s.4 3 1.2 4.2l3.3-2.3z"/>
                  <path fill="#34A853" d="M12 22c2.7 0 5-1 6.7-2.6l-3.2-2.5c-.9.6-2 1-3.5 1-2.6 0-4.7-1.7-5.5-3.9L3.2 16.3C4.8 19.8 8.1 22 12 22z"/>
                </svg>
                <span>গুগল দিয়ে প্রবেশ করুন</span>
              </button> */}

              {/* Add Demo Access Button just before the registration link */}
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm font-medium transition-all duration-300 border border-emerald-200"
              >
                ডেমো অ্যাক্সেস
              </button>
              
              {/* Update the registration link to use React Router Link */}
              <p className="mt-4 text-center text-xs text-gray-600">
                অ্যাকাউন্ট নেই?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  নিবন্ধন করুন
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;