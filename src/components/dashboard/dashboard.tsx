import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  UserX, 
  Ban, 
  Search, 
  Sprout, 
  Leaf, 
  Home, 
  Users,
  BadgeInfo,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with your actual data
  const users = [
    {
      id: 1,
      photo: "/api/placeholder/40/40",
      name: "John Doe",
      email: "john@agrifarm.com",
      role: "Farmer",
      address: "123 Farm Road, Rural County",
      type: "Organic Producer",
      status: "Active"
    },
    {
      id: 2,
      photo: "/api/placeholder/40/40",
      name: "Jane Smith",
      email: "jane@agritech.com",
      role: "Agricultural Expert",
      address: "456 Harvest Ave, Farmland",
      type: "Consultant",
      status: "Active"
    }
    
  ];

  const handleNavigation = (path: string) => {
    setActiveNav(path);
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Side Navigation */}
      <div className="fixed h-screen w-64 flex flex-col bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-green-100 bg-green-700 p-6">
          <div className="flex items-center gap-3">
            <Sprout className="h-7 w-7 text-white drop-shadow-sm" />
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">AgroNest</h1>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`flex w-full items-center px-6 py-3 text-sm font-semibold ${
              activeNav === 'dashboard'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            ড্যাশবোর্ড
          </button>
          <button
            onClick={() => handleNavigation('info-hub')}
            className={`flex w-full items-center px-6 py-3 text-sm font-semibold ${
              activeNav === 'info-hub'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <BadgeInfo className="mr-3 h-5 w-5" />
            তথ্য কেন্দ্র
          </button>
          <div className="mx-6 my-4 border-t border-green-100"></div>
          <div className="px-6 py-2 text-xs font-semibold uppercase text-gray-400">
            ত্বরিত লিঙ্কস
          </div>
          <button
            onClick={() => handleNavigation('farmer-contacts')}
            className="flex w-full items-center px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-green-50"
          >
            <Users className="mr-3 h-5 w-5" />
            কৃষক যোগাযোগ
          </button>
          <button
            onClick={() => handleNavigation('crop-calendar')}
            className="flex w-full items-center px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-green-50"
          >
            <Leaf className="mr-3 h-5 w-5" />
            ফসলের ক্যালেন্ডার
          </button>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-green-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="mr-3 h-5 w-5" />
            লগআউট
          </button>
        </div>
      </div>

       {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Menu Bar */}
        <div className="fixed top-0 right-0 left-64 bg-green-700 h-16 shadow-md z-10">
          <div className="flex items-center justify-between h-full px-6">
            {/* <h2 className="text-xl font-bold text-white">Admin Dashboard</h2> */}
            <div className="flex items-center gap-4">
              {/* <span className="text-white font-bold">John Doe</span> */}
            </div>
          </div>
        </div>
        
        {/* Main Content - Adjusted for consistent top bar height */}
        <div className="pt-16 p-6 h-screen overflow-y-auto">
          {/* Content wrapper */}
          <div className="max-w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">কৃষক ব্যবস্থাপনা</h2>
              <p className="text-sm text-gray-600">কৃষি সম্প্রদায়ের সদস্যদের পর্যবেক্ষণ ও ব্যবস্থাপনা করুন</p>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="কৃষক, বিশেষজ্ঞ বা পরামর্শক খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-green-200 bg-white py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Table with fixed header */}
            <div className="rounded-lg border border-green-100 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-green-900">Photo</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">নাম</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">ইমেইল</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">ভূমিকা</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">ঠিকানা</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">ধরণ</th>
                        <th className="px-4 py-3 text-left font-bold text-green-900">অবস্থা</th>
                        <th className="px-4 py-3 text-right font-bold text-green-900">ব্যবস্থাপনা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100">
                      {users
                        .filter(user => 
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                          <tr key={user.id} className="hover:bg-green-50">
                            <td className="px-4 py-3">
                              <img
                                src={user.photo}
                                alt={`${user.name}'s profile`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="px-4 py-3 font-medium text-green-900">{user.name}</td>
                            <td className="px-4 py-3 text-gray-600">{user.email}</td>
                            <td className="px-4 py-3 text-gray-600">{user.role}</td>
                            <td className="px-4 py-3 text-gray-600">{user.address}</td>
                            <td className="px-4 py-3 text-gray-600">{user.type}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                                ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button 
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-green-200 hover:bg-green-50"
                                  title="বিস্তারিত দেখুন"
                                >
                                  <Eye className="h-4 w-4 text-green-600" />
                                </button>
                                <button 
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-green-200 hover:bg-green-50"
                                  title="ব্যবহারকারী ব্লক করুন"
                                >
                                  <Ban className="h-4 w-4 text-yellow-600" />
                                </button>
                                <button 
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-green-200 hover:bg-green-50"
                                  title="ব্যবহারকারী মুছে ফেলুন"
                                >
                                  <UserX className="h-4 w-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;