import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { FaSeedling, FaWarehouse, FaStore } from 'react-icons/fa';

const colors = {
  primary: '#0F766E',    // Teal
  secondary: '#14B8A6',  // Light Teal
  accent: '#2DD4BF',     // Bright Teal  
  background: '#F0FDFA',
  surface: '#FFFFFF',
  text: '#0F172A',
  muted: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#10B981'
};

// Add these interfaces
interface BasicUserData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  location: string;
  district: string;
  upazila: string;
  village?: string;
}

interface RoleSpecificData {
  // Farmer
  farmingType?: string[];
  
  // Expert
  qualification?: string;
  specialization?: string[];
  experience?: number;
  certification?: string[];
  
  // Vendor
  shopName?: string;
  shopLocation?: string;
  
  // Wholesaler
  companyName?: string;
}

// Define the validation schema
const basicInfoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  contactNumber: z.string().min(10, 'Valid phone number is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  location: z.string().min(1, 'Location is required'),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().min(1, 'Upazila is required'),
  village: z.string().optional()
});

const SignUp: React.FC = () => {
  const [showBasicInfo, setShowBasicInfo] = useState(true);
  const [basicData, setBasicData] = useState<BasicUserData | null>(null);
  const [selectedRole, setSelectedRole] = useState<'FARMER' | 'EXPERT' | 'VENDOR' | 'WHOLESALER' | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BasicUserData & RoleSpecificData>({
    resolver: zodResolver(basicInfoSchema)
  });

  const onSubmit = async (data: BasicUserData) => {
    setBasicData(data);
    setShowBasicInfo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center py-8 px-3 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-[95%] sm:max-w-6xl space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12 border border-emerald-100">
        {/* Header Section with Agricultural Theme */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <FaSeedling className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mb-2">
            নতুন একাউন্ট তৈরি করুন
          </h2>
          <p className="text-xs sm:text-sm text-emerald-600">
            আপনার কৃষি জীবনের নতুন যাত্রা শুরু করুন
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100 shadow-sm">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Name Field */}
              <div className="group">
                <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  নাম
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('name')}
                    className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ই-মেইল
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                    placeholder="example@mail.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register('password')}
                    className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                    placeholder="********"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Contact Number Field */}
              <div className="group">
                <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  মোবাইল নম্বর
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    {...register('contactNumber')}
                    className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="mt-1 text-xs text-red-500">{errors.contactNumber.message}</p>
                )}
              </div>

              {/* Gender Field */}
              <div className="group">
                <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  লিঙ্গ
                </label>
                <div className="relative">
                  <select
                    {...register('gender')}
                    className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="MALE">পুরুষ</option>
                    <option value="FEMALE">মহিলা</option>
                    <option value="OTHER">অন্যান্য</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
                )}
              </div>

              {/* Location Fields - Agricultural Theme */}
              <div className="col-span-full bg-gradient-to-br from-green-50 to-emerald-50/70 rounded-xl p-4 sm:p-6 border border-emerald-100 shadow-sm">
                <h3 className="text-emerald-800 font-medium mb-4 flex items-center border-b border-emerald-100 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  আপনার কৃষি স্থান নির্বাচন করুন
                </h3>

                {/* Updated grid layout to maintain 2 columns on mobile */}
                <div className="grid grid-cols-2 gap-4">
                  {/* District Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        জেলা
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register('district')}
                      className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                      placeholder="আপনার জেলা"
                    />
                    {errors.district && (
                      <p className="mt-1 text-xs text-red-500">{errors.district.message}</p>
                    )}
                  </div>

                  {/* Upazila Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        উপজেলা
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register('upazila')}
                      className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                      placeholder="আপনার উপজেলা"
                    />
                    {errors.upazila && (
                      <p className="mt-1 text-xs text-red-500">{errors.upazila.message}</p>
                    )}
                  </div>

                  {/* Village Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        গ্রাম
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register('village')}
                      className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                      placeholder="আপনার গ্রাম"
                    />
                    {errors.village && (
                      <p className="mt-1 text-xs text-red-500">{errors.village.message}</p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        ঠিকানা
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register('location')}
                      className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                      placeholder="বাড়ি/সড়ক নং"
                    />
                    {errors.location && (
                      <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 sm:pt-6">
            <Link
              to="/signin"
              className="text-xs sm:text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              পূর্বে নিবন্ধিত?
            </Link>
            <button
              type="submit"
              className="group relative w-1/2 sm:w-1/3 flex justify-center py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              নিবন্ধন করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
