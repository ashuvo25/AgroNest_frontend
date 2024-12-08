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

// Form validation schema
const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['farmer', 'wholesaler', 'vendor']),
  // Dynamic fields
  farmSize: z.string().optional(),
  cropTypes: z.string().optional(),
  seasonalProduce: z.string().optional(),
  educationLevel: z.string().optional(),
  businessName: z.string().optional(),
  buyingCapacity: z.string().optional(),
  preferredCrops: z.string().optional(),
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  productCategories: z.string().optional(),
  distributionArea: z.string().optional(),
  logisticsCapability: z.boolean().optional(),
  aiTools: z.boolean().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });
  
  const selectedRole = watch('role');

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Handle form submission
      console.log(data);
      // Add your API call here
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/farm-bg.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-800/95 to-teal-900/95 backdrop-blur-sm"></div>
      
      <div className="relative min-h-screen flex items-center justify-center px-2 py-8 overflow-y-auto">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 h-full p-6 flex-col justify-center items-center text-white relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"></div>
          <h1 className="text-5xl font-bold mb-4">AgriNest</h1>
          <p className="text-lg text-green-100 mb-6 text-center max-w-md">
            আপনার ডিজিটাল কৃষি সহায়ক
          </p>
          
          {/* Image Grid */}
          {/* ...copy the image grid from SignIn... */}

          {/* Feature Cards */}
          {/* ...copy the feature cards from SignIn... */}
        </div>

        {/* Right side - Sign Up Form */}
        <div className="w-full max-w-[340px] sm:max-w-[460px] lg:w-1/2 lg:max-w-[500px] p-2 sm:p-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-emerald-900/20 p-4 sm:p-6 border border-white/40">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                <FaSeedling className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">নিবন্ধন করুন</h2>
                <p className="text-xs text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">পূর্ণ নাম</label>
                    <input
                      type="text"
                      {...register('fullName')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="আপনার নাম"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">ব্যবহারকারীর নাম</label>
                    <input
                      type="text"
                      {...register('username')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="ব্যবহারকারীর নাম"
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">ইমেইল</label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="ইমেইল"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">ফোন নম্বর</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="ফোন নম্বর"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">পাসওয়ার্ড</label>
                    <input
                      type="password"
                      {...register('password')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="পাসওয়ার্ড"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mt-4">
                  <label className="text-xs font-medium text-gray-700 block mb-2">ভূমিকা নির্বাচন করুন</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { role: 'farmer', icon: <FaSeedling />, label: 'কৃষক' },
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
                          value={role}
                          {...register('role')}
                          className="sr-only"
                        />
                        <span className="text-xl mb-1">{icon}</span>
                        <span className="text-xs">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dynamic Fields */}
                {selectedRole && (
                  <div className="mt-4 space-y-3 p-4 bg-emerald-50/50 rounded-lg">
                    {selectedRole === 'farmer' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">খামারের আকার</label>
                            <input
                              type="number"
                              {...register('farmSize')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="খামারের আকার"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">ফসলের ধরন</label>
                            <input
                              type="text"
                              {...register('cropTypes')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="ফসলের ধরন"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">শিক্ষার স্তর</label>
                          <select
                            {...register('educationLevel')}
                            className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                          >
                            <option value="">শিক্ষার স্তর নির্বাচন করুন</option>
                            <option value="none">কোনোটিই নয়</option>
                            <option value="primary">প্রাথমিক</option>
                            <option value="secondary">মাধ্যমিক</option>
                            <option value="higher">উচ্চ</option>
                          </select>
                        </div>
                      </>
                    )}

                    {selectedRole === 'wholesaler' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">ব্যবসার নাম</label>
                            <input
                              type="text"
                              {...register('businessName')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="ব্যবসার নাম"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">ক্রয় ক্ষমতা (টন)</label>
                            <input
                              type="number"
                              {...register('buyingCapacity')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="ক্রয��� ক্ষমতা"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">পছন্দের ফসল</label>
                          <input
                            type="text"
                            {...register('preferredCrops')}
                            className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                            placeholder="পছন্দের ফসল"
                          />
                        </div>
                      </>
                    )}

                    {selectedRole === 'vendor' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">কোম্পানির নাম</label>
                            <input
                              type="text"
                              {...register('companyName')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="কোম্পানির নাম"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">নিবন্ধন নম্বর</label>
                            <input
                              type="text"
                              {...register('registrationNumber')}
                              className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                              placeholder="নিবন্ধন নম্বর"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">বিতরণ এলাকা</label>
                          <input
                            type="text"
                            {...register('distributionArea')}
                            className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white/50 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                            placeholder="বিতরণ এ���াকা"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 rounded-lg text-sm font-medium transition-all duration-300"
              >
                {isLoading ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'নিবন্ধন করুন'}
              </button>

              {/* Sign In Link */}
              <p className="mt-4 text-center text-xs text-gray-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link 
                  to="/signin" 
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  প্রবেশ করুন
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
