import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { FaSeedling, FaWarehouse, FaStore, FaUserGraduate } from 'react-icons/fa';

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

// Consolidated RoleFormData interface
interface RoleFormData {
  role: 'farmer' | 'wholesaler' | 'vendor' | 'expert';
  // Farmer specific
  farmingType: string[];
  // Vendor specific
  shopName: string;
  shopLocation: string;
  // Wholesaler specific
  companyName: string;
  // Expert specific
  qualification: string;
  specialization: string[];
  experience: number;
  certification: FileList | null; // Add certification file
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

// Add role validation schema
const roleSchema = z.object({
  role: z.enum(['farmer', 'wholesaler', 'vendor', 'expert']),
  farmingType: z.array(z.string()).min(1, 'Select at least one farming type').optional(),
  // Vendor validations
  shopName: z.string().min(1, 'Shop name is required').optional(),
  shopLocation: z.string().min(1, 'Shop location is required').optional(),
  // Wholesaler specific
  companyName: z.string().min(1, 'Company name is required').optional(),
  // Expert specific
  qualification: z.string().min(1, 'Qualification is required').optional(),
  specialization: z.array(z.string()).min(1, 'Select at least one specialization').optional(),
  experience: z.number().min(0, 'Experience must be a positive number').optional(),
  certification: z
    .any()
    .refine((files) => files?.length === 1, "Certification file is required")
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      "Max file size is 5MB"
    )
    .refine(
      (files) => 
        ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .gif formats are supported"
    ),
}).superRefine((data, ctx) => {
  if (data.role === 'vendor') {
    if (!data.shopName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shop name is required for vendors",
        path: ["shopName"],
      });
    }
    if (!data.shopLocation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shop location is required for vendors",
        path: ["shopLocation"],
      });
    }
  }
  if (data.role === 'wholesaler' && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Company name is required for wholesalers",
      path: ["companyName"],
    });
  }
  if (data.role === 'expert') {
    if (!data.qualification) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Qualification is required for experts",
        path: ["qualification"],
      });
    }
    if (!data.specialization?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select at least one specialization",
        path: ["specialization"],
      });
    }
    if (!data.certification) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Certification document is required",
        path: ["certification"],
      });
    }
  }
});

// Add farming types constant
const FARMING_TYPES = [
  { value: 'rice', label: 'ধান চাষ' },
  { value: 'vegetables', label: 'সবজি চাষ' },
  { value: 'fruits', label: 'ফল চাষ' },
  { value: 'fish', label: 'মৎস্য চাষ' },
  { value: 'poultry', label: 'পোল্ট্রি' },
  { value: 'dairy', label: 'দুগ্ধ খামার' },
  { value: 'crop', label: 'শস্য চাষ' }
];

// Add expert specializations constant
const EXPERT_SPECIALIZATIONS = [
  { value: 'crop_disease', label: 'রোগ নির্ণয়' },
  { value: 'soil_management', label: 'মাটি ব্যবস্থাপনা' },
  { value: 'pest_control', label: 'কীটপতঙ্গ নিয়ন্ত্রণ' },
  { value: 'irrigation', label: 'সেচ ব্যবস্থাপনা' },
  { value: 'organic_farming', label: 'জৈব চাষাবাদ' },
  { value: 'seed_quality', label: 'বীজ পরীক্ষা' }
];

const SignUp: React.FC = () => {
  const [showBasicInfo, setShowBasicInfo] = useState(true);
  const [basicData, setBasicData] = useState<BasicUserData | null>(null);
  
  // Basic Info Form
  const { register: registerBasic, handleSubmit: handleBasicSubmit, formState: { errors: basicErrors } } = useForm<BasicUserData>({
    resolver: zodResolver(basicInfoSchema)
  });

  // Role Selection Form
  const { register: registerRole, handleSubmit: handleRoleSubmit, watch, formState: { errors: roleErrors } } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema)
  });
  const selectedRole = watch('role');

  const onBasicSubmit = async (data: BasicUserData) => {
    setBasicData(data);
    setShowBasicInfo(false);
  };

  const onRoleSubmit = async (data: RoleFormData) => {
    // Combine basic and role data
    const finalData = {
      ...basicData,
      ...data
    };
    console.log('Final submission:', finalData);
    // Handle final submission
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        e.target.value = '';
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only .jpg, .jpeg, .png and .gif formats are supported');
        e.target.value = '';
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/farm-bg.jpg')] bg-cover bg-center relative">
      {/* Add gradient overlay to match SignIn */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-800/95 to-teal-900/95 backdrop-blur-sm"></div>

      <div className="relative min-h-screen flex items-center justify-center py-8 px-3 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-[99%] sm:max-w-6xl space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12 border border-emerald-100">
          {/* Header Section with Agricultural Theme */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <FaSeedling className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mb-0">
              নতুন একাউন্ট তৈরি করুন
            </h2>
            <p className="text-xs sm:text-sm text-emerald-600">
              আপনার কৃষি জীবনের নতুন যাত্রা শুরু করুন
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {showBasicInfo ? (
            // Basic Info Form
            <form className="mt-1 space-y-6" onSubmit={handleBasicSubmit(onBasicSubmit)}>
              <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100 shadow-sm">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                  {/* Name Field */}
                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                      <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      নাম*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...registerBasic('name')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="আপনার পূর্ণ নাম"
                      />
                    </div>
                    {basicErrors.name && (
                      <p className="mt-1 text-xs text-red-500">{basicErrors.name.message}</p>
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
                        {...registerBasic('email')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="example@mail.com"
                      />
                    </div>
                    {basicErrors.email && (
                      <p className="mt-1 text-xs text-red-500">{basicErrors.email.message}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                      <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      পাসওয়ার্ড*
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...registerBasic('password')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="********"
                      />
                    </div>
                    {basicErrors.password && (
                      <p className="mt-1 text-xs text-red-500">{basicErrors.password.message}</p>
                    )}
                  </div>

                  {/* Wrap Contact Number and Gender fields in a div */}
                  <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2 lg:col-span-2">
                    {/* Contact Number Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                        <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        মোবাইল নম্বর*
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          {...registerBasic('contactNumber')}
                          className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                          placeholder="01XXXXXXXXX"
                        />
                      </div>
                      {basicErrors.contactNumber && (
                        <p className="mt-1 text-xs text-red-500">{basicErrors.contactNumber.message}</p>
                      )}
                    </div>

                    {/* Gender Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-emerald-700 mb-2">
                        <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        লিঙ্গ*
                      </label>
                      <div className="relative">
                        <select
                          {...registerBasic('gender')}
                          className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        >
                          <option value="">নির্বাচন করুন</option>
                          <option value="MALE">পুরুষ</option>
                          <option value="FEMALE">মহিলা</option>
                          <option value="OTHER">অন্যান্য</option>
                        </select>
                      </div>
                      {basicErrors.gender && (
                        <p className="mt-1 text-xs text-red-500">{basicErrors.gender.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Location Fields - Agricultural Theme */}
                  <div className="col-span-full bg-gradient-to-br from-green-50 to-emerald-50/70 rounded-xl p-4 sm:p-6 border border-emerald-100 shadow-sm">
                    <h3 className="text-emerald-800 font-medium mb-4 flex items-center border-b border-emerald-100 pb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      আপনার কৃষি স্থান নির্বাচন করুন
                    </h3>

                    {/* Grid container for location fields */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* District Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            জেলা*
                          </span>
                        </label>
                        <input
                          type="text"
                          {...registerBasic('district')}
                          className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                          placeholder="আপনার জেলা"
                        />
                        {basicErrors.district && (
                          <p className="mt-1 text-xs text-red-500">{basicErrors.district.message}</p>
                        )}
                      </div>

                      {/* Upazila Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            উপজেলা*
                          </span>
                        </label>
                        <input
                          type="text"
                          {...registerBasic('upazila')}
                          className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                          placeholder="আপনার উপজেলা"
                        />
                        {basicErrors.upazila && (
                          <p className="mt-1 text-xs text-red-500">{basicErrors.upazila.message}</p>
                        )}
                      </div>

                      {/* Village Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          গ্রাম*
                        </span>
                        </label>
                        <input
                          type="text"
                          {...registerBasic('village')}
                          className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                          placeholder="আপনার গ্রাম"
                        />
                        {basicErrors.village && (
                          <p className="mt-1 text-xs text-red-500">{basicErrors.village.message}</p>
                        )}
                      </div>

                      {/* Location Field */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          ঠিকানা*
                        </span>
                        </label>
                        <input
                          type="text"
                          {...registerBasic('location')}
                          className="block w-full px-3 py-2 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                          placeholder="বাড়ি/সড়ক নং"
                        />
                        {basicErrors.location && (
                          <p className="mt-1 text-xs text-red-500">{basicErrors.location.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Submit Button Section */}
              <div className="border-t border-gray-100 mt-1 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/signin"
                      className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                    >
                      <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      <span>পূর্বে নিবন্ধিত?</span>
                    </Link>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      type="reset"
                      className="px-6 py-2.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                    >
                      রিসেট
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <span>পরবর্তী ধাপ</span>
                      <svg 
                        className="w-4 h-4 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            // Role Selection Form
            <form className="mt-1 space-y-6" onSubmit={handleRoleSubmit(onRoleSubmit)}>
              {/* Role Selection */}
              <div className="mt-4">
                <label className="text-xs font-medium text-gray-700 block mb-2">ভূমিকা নির্বাচন করুন</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { role: 'farmer', icon: <FaSeedling />, label: 'কৃষক' },
                    { role: 'expert', icon: <FaUserGraduate />, label: 'বিশেষজ্ঞ' },
                    { role: 'wholesaler', icon: <FaWarehouse />, label: 'পাইকার' },
                    { role: 'vendor', icon: <FaStore />, label: 'বিক্রেতা' }
                  ].map(({ role, icon, label }) => (
                    <label
                      key={role}
                      className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                        watch('role') === role
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                          : 'border-gray-200 hover:border-emerald-200'
                      }`}
                    >
                      <input
                        type="radio"
                        {...registerRole('role')}
                        value={role}
                        className="sr-only"
                      />
                      <span className="text-xl mb-1">{icon}</span>
                      <span className="text-xs">{label}</span>
                    </label>
                  ))}
                </div>
                {roleErrors.role && (
                  <p className="mt-1 text-xs text-red-500">{roleErrors.role.message}</p>
                )}
              </div>

              {/* Dynamic Fields based on role */}
              {watch('role') === 'farmer' && (
                <div className="space-y-4 p-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    চাষের ধরন নির্বাচন করুন*
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {FARMING_TYPES.map(({ value, label }) => (
                      <label
                        key={value}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          watch('farmingType')?.includes(value)
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                            : 'border-gray-200 hover:border-emerald-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          {...registerRole('farmingType')}
                          value={value}
                          className="sr-only"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                  {roleErrors.farmingType && (
                    <p className="mt-1 text-xs text-red-500">{roleErrors.farmingType.message}</p>
                  )}
                </div>
              )}

              {/* Similar blocks for wholesaler and vendor */}
              {watch('role') === 'wholesaler' && (
                <div className="space-y-4 p-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      কোম্পানির নাম*
                    </label>
                    <input
                      type="text"
                      {...registerRole('companyName')}
                      className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                      placeholder="আপনার কোম্পানির নাম"
                    />
                    {roleErrors.companyName && (
                      <p className="mt-1 text-xs text-red-500">{roleErrors.companyName.message}</p>
                    )}
                  </div>
                </div>
              )}

              {watch('role') === 'vendor' && (
                <div className="space-y-4 p-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        দোকানের নাম*
                      </label>
                      <input
                        type="text"
                        {...registerRole('shopName')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="আপনার দোকানের নাম"
                      />
                      {roleErrors.shopName && (
                        <p className="mt-1 text-xs text-red-500">{roleErrors.shopName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        দোকানের ঠিকানা*
                      </label>
                      <input
                        type="text"
                        {...registerRole('shopLocation')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="দোকানের পূর্ণ ঠিকানা"
                      />
                      {roleErrors.shopLocation && (
                        <p className="mt-1 text-xs text-red-500">{roleErrors.shopLocation.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {watch('role') === 'expert' && (
                <div className="space-y-4 p-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        শিক্ষাগত যোগ্যতা*
                      </label>
                      <input
                        type="text"
                        {...registerRole('qualification')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="আপনার শিক্ষাগত যোগ্যতা"
                      />
                      {roleErrors.qualification && (
                        <p className="mt-1 text-xs text-red-500">{roleErrors.qualification.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        অভিজ্ঞতা (বছর)*
                      </label>
                      <input
                        type="number"
                        {...registerRole('experience')}
                        className="block w-full px-4 py-3 rounded-lg border-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-white text-sm"
                        placeholder="কত বছরের অভিজ্ঞতা"
                      />
                      {roleErrors.experience && (
                        <p className="mt-1 text-xs text-red-500">{roleErrors.experience.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Add certification upload field */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      সার্টিফিকেশন*
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-emerald-200 border-dashed rounded-lg hover:border-emerald-300 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-emerald-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                            <span>ফাইল আপলোড করুন</span>
                            <input
                              type="file"
                              {...registerRole('certification')}
                              className="sr-only"
                              accept="image/jpeg,image/jpg,image/png,image/gif"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                    {roleErrors.certification && (
                      <p className="mt-1 text-xs text-red-500">{roleErrors.certification.message}</p>
                    )}
                  </div>

                  {/* Existing specialization field */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      বিশেষজ্ঞ এলাকা*
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {EXPERT_SPECIALIZATIONS.map(({ value, label }) => (
                        <label
                          key={value}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                            watch('specialization')?.includes(value)
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                              : 'border-gray-200 hover:border-emerald-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            {...registerRole('specialization')}
                            value={value}
                            className="sr-only"
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                    {roleErrors.specialization && (
                      <p className="mt-1 text-xs text-red-500">{roleErrors.specialization.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBasicInfo(true)}
                  className="px-6 py-2.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                >
                  পূর্ববর্তী
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  নিবন্ধন করুন
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    );
  };
  
// <<<<<<< HEAD
  export default SignUp;
// =======
